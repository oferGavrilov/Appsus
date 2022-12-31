
const { NavLink } = ReactRouterDOM

export function MailNav({ unreadMailsCount }) {

    return <nav className='mail-nav'>
        <NavLink to='/mail/inbox'><i className='fa-solid fa-inbox inbox-icon'></i> Inbox <span>{unreadMailsCount}</span></NavLink>
        <NavLink to='/mail/starred'><i className='fa-regular fa-star starred-icon'></i>Starred</NavLink>
        <NavLink to='/mail/sent'><i className='fa-solid fa-caret-right sent-icon'></i>Sent</NavLink>
        <NavLink to='/mail/draft'><i className='fa-regular fa-file drafts-icon'></i>Drafts</NavLink>
        <NavLink to='/mail/trash'><i className='fa-solid fa-trash-can trash-icon'></i>Trash</NavLink>
    </nav>

}