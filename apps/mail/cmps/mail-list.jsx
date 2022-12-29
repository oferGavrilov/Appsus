import { MailPreview } from './mail-preview.jsx'
import { mailService } from '../services/mail.service.js'

export function MailList({ mails, onSelectMail, onDeleteMail, loadUnreadMailsCount }) {

    function onToggleRead(ev, mail) {
        ev.stopPropagation()
        console.log('mail:', mail)
        mail.isRead = !mail.isRead
        loadUnreadMailsCount(mails)
        // Should consider doing it from mail index
        mailService.save(mail)
            .then(updatedEntity => console.log('updatedEntity:', updatedEntity))
            .catch(err => console.log('Had trouble updating mail read at mail list', err))
    }

    function onToggleStarred(ev, mail) {
        ev.stopPropagation()
        mail.isStarred = !mail.isStarred
        mailService.save(mail)
            .then(updatedEntity => console.log('updatedEntity:', updatedEntity))
            .catch(err => console.log('Had trouble updating mail star at mail list', err))
    }

    return <section className='mail-list' >
        {mails.map(mail => <MailPreview key={mail.id} mail={mail} onSelectMail={onSelectMail}
            onDeleteMail={onDeleteMail} onToggleRead={onToggleRead} onToggleStarred={onToggleStarred} />
        )}
    </section>

}
