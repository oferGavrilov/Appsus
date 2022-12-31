
import { utilService } from '../../../services/util.service.js'

export function MailPreview({ mail, onSelectMail, onDeleteMail, onToggleRead, onToggleStarred }) {

    return <section onClick={() => onSelectMail(mail.id)}
        className={`mail-preview ${mail.isRead ? ' read' : ''}`} onMouseEnter={() => console.log('check')}>

        <div className='mail-star'>
            {mail.isStarred ?
                <i className='fa-solid fa-star star mail-starred' title='Starred' onClick={(ev) => onToggleStarred(ev, mail)}></i>
                :
                <i className='fa-regular fa-star star' title='Starred' onClick={(ev) => onToggleStarred(ev, mail)}></i>
            }
        </div>
        <div className='mail-from'>{mail.from}</div>
        <div className='mail-subject'>{mail.subject}</div>
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

        <div className={`mail-date-sent ${mail.isRead ? 'read' : ''}`}>{utilService.getFormattedDate(mail.sentAt)}</div>

    </section >
}


