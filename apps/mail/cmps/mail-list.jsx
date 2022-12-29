import { MailPreview } from './mail-preview.jsx'

export function MailList({ mails, onSelectMail }) {

    function onDeleteMail(mailId) {
        console.log('mailId:', mailId)
    }

    function onToggleRead(mail) {
        console.log('mail:', mail)
    }

    function onToggleStarred(mail) {

    }

    return <section className='mail-list' >
        {mails.map(mail => <MailPreview key={mail.id} mail={mail} onSelectMail={onSelectMail}
            onDeleteMail={onDeleteMail} onToggleRead={onToggleRead} onToggleStarred={onToggleStarred} />
        )}
    </section>

}
