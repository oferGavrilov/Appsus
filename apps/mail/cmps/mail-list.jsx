const { Fragment } = React
import { MailPreview } from './mail-preview.jsx'

export function MailList({ mails, onSelectMail }) {

    return <section className='mail-list' >
        {mails.map(mail =>
            <Fragment key={mail.id}>
                <MailPreview mail={mail} onSelectMail={onSelectMail} />
            </Fragment>
        )}
    </section>

}
