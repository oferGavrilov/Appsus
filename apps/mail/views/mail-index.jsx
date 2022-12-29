const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import { MailHeader } from '../cmps/mail-header.jsx'
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

    useEffect(() => {
        setIsLoading(true)
        loadMails()
    }, [filterBy])

    useEffect(() => {
        loadUnreadMailsCount(mails)
    }, [mails])

    useEffect(() => {
        onSetSort()
        console.log('state changed')
    }, [sortBy])

    function onDeleteMail(ev, mail) {
        ev.stopPropagation()
        mailService.move(mail, 'trash')
            .then(deletedMail => {
                const updatedMails = mails.filter(mail => mail.id !== deletedMail.id)
                setMails(updatedMails)
            })
    }

    function loadMails() {
        mailService.query(filterBy)
            .then(mails => {
                setMails(mails)
            })
            .catch(err => console.log('Had trouble with loading mails in mail-index(loadMails)', err))
    }

    function loadUnreadMailsCount(mails) {
        if (!mails.length) return
        setUnreadMailsCount(mailService.getUnreadMailsCount(mails, 'inbox'))
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
        navigate(`/mail/${mailId}`)
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

    return <section className='mail-index'>
        <section className='mail-header-container'>
            <button onClick={() => setIsComposingOn(true)}>Compose</button>
            <MailHeader />
            <MailFilter onSetFilter={onSetFilter} />
            <button onClick={() => setSortBy('date')} className='btn-sort'>Sort by date</button>
            <button onClick={() => setSortBy('subject')} className='btn-sort'>Sort by subject</button>
        </section>
        {isLoading ? <h2>Loading..</h2>
            : <main className='mail-main-content'>
                <MailNav unreadMailsCount={unreadMailsCount} />
                <MailList mails={mails} onSelectMail={onSelectMail}
                    onDeleteMail={onDeleteMail} loadUnreadMailsCount={loadUnreadMailsCount} />
            </main>}

        {isComposingOn && <ComposeMail onSendMail={onSendMail} onDoneComposing={onDoneComposing} />}

    </section>
}

