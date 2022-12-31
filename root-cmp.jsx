const { Route, Routes } = ReactRouterDOM
const { useState } = React
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
// import { SentMails } from './apps/mail/views/sent-mails.jsx'
// import { MailDraft } from './apps/mail/views/mail-draft.jsx'
// import { MailTrash } from './apps/mail/views/mail-trash.jsx'

import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { MailDetails } from './apps/mail/views/mail-details.jsx'


export function App() {

    const [isMenuDisplayed, setIsMenuDisplayed] = useState(false)


    function onSetMenuDisplay() {
        setIsMenuDisplayed(!isMenuDisplayed)
    }

    return <Router>
        <section className={`app ${isMenuDisplayed ? 'menu-open' : ''}`}>
            <AppHeader onSetMenuDisplay={onSetMenuDisplay} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />

                <Route path="/mail/inbox" element={<MailIndex />} />
                <Route path="/mail/inbox/:mailId" element={<MailDetails />} />
                <Route path="/mail/starred" element={<MailIndex />} />
                <Route path="/mail/sent" element={<MailIndex />} />
                <Route path="/mail/draft" element={<MailIndex />} />
                <Route path="/mail/trash" element={<MailIndex />} />

                <Route path="/note" element={<NoteIndex />}>


                </Route>

            </Routes>
        </section>
    </Router>
}
