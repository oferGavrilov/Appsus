const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM

import { MailList } from '../cmps/mail-list.jsx'

import { mailService } from '../services/mail.service.js'

export function MailIndex() {

    const [mails, setMails] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        loadMails()
    }, [])

    function loadMails() {
        mailService.query()
            .then(mails => {
                setMails(mails)
                setIsLoading(false)
                // console.log('mails:', mails)
            })
    }

    function onSelectMail(mailId) {
        navigate(`/mail/${mailId}`)
    }


    return <main className='mail-index'>
        <MailList mails={mails} onSelectMail={onSelectMail} />

    </main>
}

