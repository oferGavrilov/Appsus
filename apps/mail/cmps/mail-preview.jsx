
import { utilService } from '../../../services/util.service.js'

export function MailPreview({ mail, onSelectMail, onDeleteMail, onToggleRead, onToggleStarred }) {

    return <section onClick={() => onSelectMail(mail.id)}
        className={`mail-preview ${mail.isRead ? ' read' : ''}`}>
        <div onClick={() => onToggleStarred(mail)} className='mail-star'>⭐</div>
        <div className='mail-subject'>{mail.subject}</div>
        <div className='mail-body'>{utilService.getTextToDisplay(mail.body, 40)}</div>
        <div className='delete-mail'>
            <i className='delete-mail fa-solid fa-trash-can' onClick={onDeleteMail} title='Delete'></i>
        </div>

        <div className='mail-date-sent'>{utilService.getFormattedDate(mail.sentAt)}</div>
    </section >
}


