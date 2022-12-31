const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { MailNav } from '../cmps/mail-nav.jsx'
import { mailService } from '../services/mail.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import { utilService } from '../../../services/util.service.js'

export function MailDetails() {
    const [selectedMail, setSelectedMail] = useState(null)

    const { mailId, category } = useParams()
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
        navigate(`/mail/${category}`)
    }

    function onDeleteMail() {
        mailService.move(selectedMail, 'trash')
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

    if (!selectedMail) return <h2>Loading..</h2>
    return <section className='mail-details'>

        <aside className='mail-nav-container'>

            <button className='btn-compose' onClick={() => setIsComposingOn(true)}>
                <i className="fa-solid fa-pencil compose-icon"></i>
                Compose</button>

            {/* <MailNav unreadMailsCount={unreadMailsCount} /> */}
            <MailNav />
        </aside>

        <div className='mail-content-container'>
            <div className='mail-details-actions'>
                <i className='go-back fa-solid fa-arrow-left' onClick={onGoBack} title='Back to Inbox'></i>
                <i className='delete-mail fa-solid fa-trash-can' onClick={onDeleteMail} title='Delete'></i>
                <i className='move-mail fa-regular fa-folder' title='Move to'></i>
                <i className='unread fa-regular fa-envelope' title='Mark as unread'></i>
            </div>
            <div className='mail-details-subject'>{selectedMail.subject}</div>
            <div className="mail-details-content">
                <div className='mail-details-header'>
                    <i className="fa-solid fa-user-large user-icon"></i>
                    <div className='sent-from'>{selectedMail.from}</div>
                    <span className='sent-at'>{utilService.getFormattedDate(selectedMail.sentAt)}</span>
                    <div className='mail-star'>
                        {selectedMail.isStarred ?
                            <i className='fa-solid fa-star star mail-starred' title='Starred'></i>
                            :
                            <i className='fa-regular fa-star star' title='Starred'></i>
                        }
                    </div>
                </div>
            </div>
            <div className='mail-details-body'>
                {selectedMail.body}
            </div>
        </div>
    </section>
}

{/* Consider: <div className='mail-subject'>{selectedMail.subject}</div> */ }
