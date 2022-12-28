
import { utilService } from '../../../services/util.service.js'

export function MailPreview({ mail, onSelectMail }) {

    return <section onClick={() => onSelectMail(mail.id)}
        className={`mail-preview ${mail.isRead ? ' read' : ''}`}>
        <div className='mail-subject'>{mail.subject}</div>
        <div className='mail-body'>{utilService.getTextToDisplay(mail.body, 40)}</div>
    </section>
}