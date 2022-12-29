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
    const [isComposingOn, setIsComposingOn] = useState(false)
    const [unreadMailsCount, setUnreadMailsCount] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        loadMails()
    }, [])

    useEffect(() => {
        loadUnreadMailsCount()
    }, [mails])

    function loadMails() {
        mailService.query()
            .then(mails => {
                setMails(mails)
                console.log('mails:', mails)
            })
            .catch(err => console.log('Had trouble with loading mails in mail-index(loadMails)', err))
    }

    function loadUnreadMailsCount() {
        if (!mails.length) return
        setUnreadMailsCount(mailService.getUnreadMailsCount(mails, 'inbox'))
        setIsLoading(false)
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
            <MailFilter />
        </section>
        {isLoading ? <h2>Loading..</h2>
            : <main className='mail-main-content'>
                <MailNav unreadMailsCount={unreadMailsCount} />
                <MailList mails={mails} onSelectMail={onSelectMail} />
            </main>}

        {isComposingOn && <ComposeMail onSendMail={onSendMail} onDoneComposing={onDoneComposing} />}

    </section>
}

