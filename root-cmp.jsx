const { Route, Routes } = ReactRouterDOM
const { useState } = React
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/app-header.jsx'
import { About } from './views/about.jsx'
import { Home } from './views/home.jsx'

import { MailIndex } from './apps/mail/views/mail-index.jsx'
import { MailDetails } from './apps/mail/views/mail-details.jsx'

import { NoteIndex } from './apps/note/views/note-index.jsx'
//book
// import { AppHeader } from './apps/book/cmps/app-header.jsx'
import { BookAdd } from './apps/book/pages/book-add.jsx'
import { BookDetails } from './apps/book/pages/book-details.jsx'
import { BookEdit } from './apps/book/pages/book-edit.jsx'
import { BookIndex } from './apps/book/pages/book-index.jsx'
import { UserMsg } from './cmps/user-msg.jsx'

export function App() {
    const [isMenuDisplayed, setIsMenuDisplayed] = useState(false)

    function onSetMenuDisplay() {
        setIsMenuDisplayed(!isMenuDisplayed)
    }

    return (
        <Router>
            <section className={`app ${isMenuDisplayed ? 'menu-open' : ''}`}>
                <AppHeader onSetMenuDisplay={onSetMenuDisplay} />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />

                    <Route path='/mail/inbox' element={<MailIndex />} />
                    <Route path='/mail/:category/:mailId' element={<MailDetails />} />
                    <Route path='/mail/starred' element={<MailIndex />} />
                    <Route path='/mail/sent' element={<MailIndex />} />
                    <Route path='/mail/draft' element={<MailIndex />} />
                    <Route path='/mail/trash' element={<MailIndex />} />

                    <Route path='/note' element={<NoteIndex />} />
                    {/* <Route> */}
                    <Route element={<BookIndex />} path='/book' />
                    <Route element={<BookEdit />} path='/book/edit' />
                    <Route element={<BookEdit />} path='/book/edit/:bookId' />
                    <Route element={<BookAdd />} path='/book/addBook' />
                    <Route element={<BookDetails />} path='/book/:bookId' />
                </Routes>
            </section>
            <UserMsg />
        </Router>
    )
}
