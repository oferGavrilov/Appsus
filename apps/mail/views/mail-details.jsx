const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { MailNav } from '../cmps/mail-nav.jsx'
import { mailService } from '../services/mail.service.js'
import { showErrorMsg } from '../../../services/event-bus.service.js'
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

    if (!selectedMail) return <h2>Loading</h2>
    return <section className='mail-details'>

        <div className='mail-details-actions'><i onClick={onGoBack} title='Back to Inbox'>&lt;-</i></div>
        <div className="mail-details-container">
            <MailNav />
            <div className='mail-details-subject'>{selectedMail.subject}</div>
            <div>{utilService.getFormattedDate(selectedMail.sentAt)}</div>
            <main className='mail-details-body'>
                {selectedMail.body}
            </main>
        </div>
    </section>
}

{/* Consider: <div className='mail-subject'>{selectedMail.subject}</div> */ }
