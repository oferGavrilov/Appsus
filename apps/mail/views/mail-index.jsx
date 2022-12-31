const { useState, useEffect } = React
const { useNavigate, useLocation } = ReactRouterDOM
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import { MailNav } from '../cmps/mail-nav.jsx'
import { MailList } from '../cmps/mail-list.jsx'

import { mailService } from '../services/mail.service.js'
import { MailFilter } from '../cmps/mail-filter.jsx'
import { ComposeMail } from '../cmps/compose-mail.jsx'

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
        loadUnreadMailsCount(mails)
        console.log('rendered')
    }, [mails])

    useEffect(() => {
        onSetSort()
    }, [sortBy])

    function onDeleteMail(ev, mail) {
        ev.stopPropagation()
        mailService.deleteMail(mail)
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
        mailService.query(filterBy)
            .then(mails => {
                setMails(mails)
            })
            .catch(err => console.log('Had trouble with loading mails in mail-index(loadMails)', err))
    }

    function loadUnreadMailsCount() {
        if (!mails.length) return
        const mailsCount = mails.reduce((acc, mail) => {
            if (!mail.isRead) acc++
            return acc
        }, 0)
        setUnreadMailsCount(mailsCount)
        setIsLoading(false)
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
        mailService.save(mail)
            .then((mail) => {
                console.log('mail:', mail)
                showSuccessMsg('Mail sent')
            })
            .catch((err) => {
                console.log('Had trouble sending mail in compose mail', err)
                showErrorMsg('Failed to send mail')
            })
        onDoneComposing()
    }

    function onDoneComposing() {
        setIsComposingOn(false)
    }

    function onToggleRead(ev, mail) {
        ev.stopPropagation()
        console.log('mail:', mail)
        mail.isRead = !mail.isRead
        setMails([...mails])
        mailService.save(mail)
            .then(updatedEntity => console.log('updatedEntity:', updatedEntity))
            .catch(err => console.log('Had trouble updating mail read at mail list', err))
    }

    function onToggleStarred(ev, mail) {
        ev.stopPropagation()
        mail.isStarred = !mail.isStarred
        setMails([...mails])
        mailService.save(mail)
            .then(updatedEntity => console.log('updatedEntity:', updatedEntity))
            .catch(err => console.log('Had trouble updating mail star at mail list', err))
    }


    return <section className='mail-index'>
        <section className='filter-section'>
            <MailFilter onSetFilter={onSetFilter} />
            <button onClick={() => setSortBy('date')} className='btn-sort'>Sort by date</button>
            <button onClick={() => setSortBy('subject')} className='btn-sort'>Sort by subject</button>
        </section>
        {
            isLoading ? <h2>Loading..</h2>
                : <main className='mail-main-content'>
                    <aside className='mail-nav-container'>

                        <button className='btn-compose' onClick={() => setIsComposingOn(true)}>
                            <i className="fa-solid fa-pencil compose-icon"></i>
                            Compose</button>

                        <MailNav unreadMailsCount={unreadMailsCount} />
                    </aside>
                    <MailList mails={mails} onSelectMail={onSelectMail}
                        onDeleteMail={onDeleteMail} onToggleRead={onToggleRead} onToggleStarred={onToggleStarred} />
                </main>
        }

        {isComposingOn && <ComposeMail onSendMail={onSendMail} onDoneComposing={onDoneComposing} />}

    </section >
}

