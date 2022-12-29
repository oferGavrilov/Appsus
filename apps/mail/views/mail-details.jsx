const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { MailNav } from '../cmps/mail-nav.jsx'
import { mailService } from '../services/mail.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import { utilService } from '../../../services/util.service.js'

export function MailDetails() {
    const [selectedMail, setSelectedMail] = useState(null)

    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadSelectedMail()
    }, [])

    function loadSelectedMail() {
        mailService.get(mailId)
            .then((mail) => {
                console.log('mail:', mail)
                setSelectedMail(mail)
                if (!mail.isRead) setMailIsRead(mail)
            })
            .catch((err) => {
                console.log('Had issues with loading mail at mail-details', err)
                onGoBack()
                showErrorMsg('Failed loading mail')
            })
    }

    function setMailIsRead(mail) {
        mailService.save({ ...mail, isRead: true })
    }

    function onGoBack() {
        navigate('/mail')
    }

    function onDeleteMail() {
        mailService.deleteMail(selectedMail)
            .then(res => {
                console.log(res)
                showSuccessMsg('Mail moved to Trash')
            })
            .catch(err => {
                console.log('Had trouble with deleting mail in mail-details', err)
                showErrorMsg('Failed to remove mail')
            })
            .finally(onGoBack)
    }

    if (!selectedMail) return <h2>Loading</h2>
    return <section className='mail-details'>

        <div className='mail-details-actions'>
            <i className='go-back fa-solid fa-arrow-left' onClick={onGoBack} title='Back to Inbox'></i>
            <i className='delete-mail fa-solid fa-trash-can' onClick={onDeleteMail} title='Delete'></i>
            <i className='move-mail fa-regular fa-folder' title='Move to'></i>
            <i className='unread fa-regular fa-envelope' title='Mark as unread'></i>
        </div>
        <div className="mail-details-container">
            <div className='mail-details-subject'>{selectedMail.subject}</div>
            <header className='mail-details-header'>
                <h4 className='sent-from'>{selectedMail.from}</h4>
                <span className='sent-at'>{utilService.getFormattedDate(selectedMail.sentAt)}</span>
                <button>⭐</button>
            </header>
            <main className='mail-details-body'>
                {selectedMail.body}
            </main>
        </div>
    </section>
}

{/* Consider: <div className='mail-subject'>{selectedMail.subject}</div> */ }
