const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { SentMails } from './apps/mail/views/sent-mails.jsx'
import { MailDraft } from './apps/mail/views/mail-draft.jsx'
import { MailTrash } from './apps/mail/views/mail-trash.jsx'

import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { MailDetails } from './apps/mail/views/mail-details.jsx'

export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />

                <Route path="/mail" element={<MailIndex />} />
                <Route path="/mail/:mailId" element={<MailDetails />} />
                <Route path="/mail/sent" element={<MailIndex />} />
                <Route path="/mail/draft" element={<MailDraft />} />
                <Route path="/mail/trash" element={<MailTrash />} />

                <Route path="/note" element={<NoteIndex />}>


                </Route>

            </Routes>
        </section>
    </Router>
}
