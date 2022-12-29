const { Fragment } = React
import { MailPreview } from './mail-preview.jsx'

export function MailList({ mails, onSelectMail }) {

    return <section className='mail-list' >
        {mails.map(mail => <MailPreview key={mail.id} mail={mail} onSelectMail={onSelectMail} />
        )}
    </section>

}
