import { MailPreview } from './mail-preview.jsx'
import { mailService } from '../services/mail.service.js'

export function MailList({ mails, onSelectMail, onDeleteMail, onToggleRead, onToggleStarred }) {


    return <section className='mail-list' >
        {mails.map(mail => <MailPreview key={mail.id} mail={mail} onSelectMail={onSelectMail}
            onDeleteMail={onDeleteMail} onToggleRead={onToggleRead} onToggleStarred={onToggleStarred} />
        )}
    </section>

}
