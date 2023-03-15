import { MailNav } from '../cmps/mail-nav.jsx'
import { MailList } from '../cmps/mail-list.jsx'
import { MailFilter } from '../cmps/mail-filter.jsx'
import { ComposeMail } from '../cmps/compose-mail.jsx'

import { mailService } from '../services/mail.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect } = React
const { useNavigate, useLocation } = ReactRouterDOM

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [unreadMailsCount, setUnreadMailsCount] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [sortBy, setSortBy] = useState('')
    const [isComposingOn, setIsComposingOn] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        setIsLoading(true)
        loadMails()
    }, [filterBy, location.pathname])

    useEffect(() => {
        onSetSort()
    }, [sortBy])

    function onDeleteMail(ev, mail) {
        ev.stopPropagation()
        mailService
            .deleteMail(mail)
            .then(deletedMail => {
                const updatedMails = mails.filter(mail => mail.id !== deletedMail.id)
                showSuccessMsg('Mail deleted successfully')
                setMails(updatedMails)
            })
            .catch(err => {
                showErrorMsg('Failed to delete mail')
            })
    }

    function loadMails() {
        filterBy.status = location.pathname.slice(6)
        mailService
            .query(filterBy)
            .then(mails => {
                setMails(mails)
                !unreadMailsCount && loadUnreadMailsCount(mails)
                setIsLoading(false)
            })
            .catch(err => {
                console.log('Failed to load mails with error', err)
                showErrorMsg('Failed to load mails')
            })
    }

    function loadUnreadMailsCount(mails) {
        if (!mails.length) return
        const mailsCount = mails.reduce((acc, mail) => {
            if (!mail.isRead) acc++
            return acc
        }, 0)
        setUnreadMailsCount(mailsCount)
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onSetSort() {
        if (!sortBy) return
        const sortedMails = mailService.setMailsSort(mails, sortBy)
        setMails([...sortedMails])
    }

    function onSelectMail(mailId) {
        navigate(`${location.pathname}/${mailId}`)
    }

    function onSendMail(mail) {
        mailService
            .save(mail)
            .then(mail => {
                showSuccessMsg('Mail sent')
            })
            .catch(err => {
                showErrorMsg('Failed to send mail')
            })
        onDoneComposing()
    }

    function onDoneComposing() {
        setIsComposingOn(false)
    }

    function onToggleRead(ev, mail) {
        ev.stopPropagation()
        mail.isRead = !mail.isRead
        setUnreadMailsCount(prevCount => {
            return mail.isRead ? prevCount - 1 : prevCount + 1
        })
        mailService
            .save(mail)
            .then(() => showSuccessMsg(`Conversation marked as ${mail.isRead ? 'read' : 'unread'}.`))
            .catch(err => console.log('Had trouble updating mail read at mail list', err))
    }

    function onToggleStarred(ev, mail) {
        ev.stopPropagation()
        mail.isStarred = !mail.isStarred
        setMails([...mails])
        mailService.save(mail).catch(err => showErrorMsg('Please try again later'))
    }

    return (
        <section className='mail-index'>
            <section className='filter-section'>
                <MailFilter onSetFilter={onSetFilter} />
                <button onClick={() => setSortBy('date')} className='btn-sort'>
                    Sort by date
                </button>
                <button onClick={() => setSortBy('subject')} className='btn-sort'>
                    Sort by subject
                </button>
            </section>
            {isLoading ? (
                <h2>Loading..</h2>
            ) : (
                <main className='mail-main-content'>
                    <aside className='mail-nav-container'>
                        <button className='btn-compose' onClick={() => setIsComposingOn(true)}>
                            <i className='fa-solid fa-pencil compose-icon'></i>
                            Compose
                        </button>

                        <MailNav unreadMailsCount={unreadMailsCount} />
                    </aside>
                    <MailList
                        mails={mails}
                        onSelectMail={onSelectMail}
                        onDeleteMail={onDeleteMail}
                        onToggleRead={onToggleRead}
                        onToggleStarred={onToggleStarred}
                    />
                </main>
            )}

            {isComposingOn && <ComposeMail onSendMail={onSendMail} onDoneComposing={onDoneComposing} />}
        </section>
    )
}
