import { AppFilter } from "./app-filter.jsx"

const { Link, NavLink, useLocation } = ReactRouterDOM
const { useState, useEffect } = React

export function AppHeader({onSetMenuDisplay}) {

    const location = useLocation().pathname.slice(1, 5)

    useEffect(() => {
    }, [location])

    return <header className="app-header">
        <Link to="/">
            <i className="fa-brands fa-react">Appsus</i>
        </Link>

        <button className="menu-toggle-btn" onClick={onSetMenuDisplay}><i className="fa-solid fa-bars"></i></button>
        <nav className="app-nav">
            {/* <NavLink to="/"><i className="fa-solid fa-house"></i></NavLink> */}
            <NavLink to="/about"><i className="fa-solid fa-info"></i></NavLink>
            <NavLink to="/mail/inbox"> <i className="fa-regular fa-envelope"></i></NavLink>
            <NavLink to="/note"><i className="fa-solid fa-note-sticky"></i></NavLink>
            <NavLink to="/book"><i className="fa-solid fa-book"></i></NavLink>
        </nav>
    </header>
}
