const { NavLink } = ReactRouterDOM

export function MailNav({ unreadMailsCount }) {

    return <nav className='mail-nav'>
        <NavLink to='/mail/inbox'><i className='fa-solid fa-inbox'></i> Inbox <span>{unreadMailsCount}</span></NavLink>
        <NavLink to='/mail/starred'>Starred</NavLink>
        <NavLink to='/mail/sent'><i className='fa-solid fa-caret-right'></i>Sent</NavLink>
        <NavLink to='/mail/draft'><i className='fa-regular fa-file'></i>Drafts</NavLink>
        <NavLink to='/mail/trash'><i className='fa-solid fa-trash-can'></i>Trash</NavLink>
    </nav>

}