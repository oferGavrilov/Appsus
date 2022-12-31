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
        <div className='compose-header'>
            <span>New Message</span>
            <button onClick={onChangeComposeSize} className="btn-compose-size">{isComposeExtended
                ? <i className="fa-solid fa-down-left-and-up-right-to-center"></i>
                : <i className="fa-solid fa-up-right-and-down-left-from-center"></i>}
            </button>
            <button onClick={onDoneComposing} className='btn-close-compose'><i className="fa-solid fa-xmark"></i>
            </button>

        </div>

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