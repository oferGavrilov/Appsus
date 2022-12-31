import { AppFilter } from "./app-filter.jsx"

const { Link, NavLink , useLocation} = ReactRouterDOM
const {useState , useEffect} = React

export function AppHeader() {

    const location  = useLocation().pathname.slice(1,5)

    useEffect(() => {
        // console.log(location)
    }, [location])

    return <header className="app-header">
        <Link to="/">
            <h3>LOGO!</h3>
        </Link>

        <AppFilter />
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail/inbox">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>
    </header>
}
