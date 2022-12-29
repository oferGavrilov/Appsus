
import { utilService } from '../../../services/util.service.js'

export function MailPreview({ mail, onSelectMail, onDeleteMail, onToggleRead, onToggleStarred }) {

    return <section onClick={() => onSelectMail(mail.id)}
        className={`mail-preview ${mail.isRead ? ' read' : ''}`}>
        <div onClick={(ev) => onToggleStarred(ev, mail)} className='mail-star'>⭐</div>
        <div className='mail-subject'>{mail.subject}</div>
        <div className='mail-body'>{utilService.getTextToDisplay(mail.body, 40)}</div>
        <div className='delete-mail'>
            <i className='delete-mail fa-solid fa-trash-can' onClick={(ev) => onDeleteMail(ev, mail)} title='Delete'></i>
        </div>

        <div className='read-mail'>
            {mail.isRead ?
                <i onClick={(ev) => onToggleRead(ev, mail)} className='unread fa-regular fa-envelope' title='Mark as unread'></i>
                :
                <i onClick={(ev) => onToggleRead(ev, mail)} className="fa-regular fa-envelope-open" title='Mark as read'></i>
            }
        </div>

        <div className='mail-date-sent'>{utilService.getFormattedDate(mail.sentAt)}</div>
    </section >
}


