const { useState, useEffect } = React

import { mailService } from '../services/mail.service.js'

export function ComposeMail({ onSendMail, onDoneComposing }) {

    const [mail, setMail] = useState(mailService.getEmptyMail())
    const [isComposeExtended, setIsComposeExtended] = useState(false)

    function handleChange({ target }) {
        let { value, name: field } = target
        setMail((prevMail) => ({ ...prevMail, [field]: value }))
    }

    function onSumbitCompose(ev) {
        ev.preventDefault()
        mail.sentAt = Date.now()
        onSendMail(mail)
    }

    function onChangeComposeSize() {
        setIsComposeExtended(prev => !prev)
    }

    console.log('isComposeExtended:', isComposeExtended)

    return <section className={`compose-mail ${isComposeExtended ? 'large' : 'small'}`}>
        <header className='compose-header'>
            <h6>New Message</h6>
            <button onClick={onChangeComposeSize} className="btn-compose-size">+</button>
            <button onClick={onDoneComposing} className='btn-close-compose'>x</button>
        </header>

        <form onSubmit={onSumbitCompose} className='compose-input-container'>
            <input
                type="text"
                value={mail.to}
                name='to'
                onChange={handleChange}
                placeholder='To'
            />

            <input
                type="text"
                value={mail.subject}
                name="subject"
                onChange={handleChange}
            />

            <textarea type='text' cols="30" rows="10"
                value={mail.body}
                name="body"
                onChange={handleChange}
            />
            <button className="btn-send-compose">Send</button>
        </form>



    </section>
}

// should conditionly render compose size 