const { NavLink } = ReactRouterDOM

export function MailNav({ unreadMailsCount }) {

    console.log('unreadMails:', unreadMailsCount)

    return <nav className='mail-nav'>
        <NavLink to='/mail'><i>i</i> Inbox <span>{unreadMailsCount}</span></NavLink>
        {/* <NavLink to='/mail/starred'>Starred</NavLink> */}
        <NavLink to='/mail/sent'>Sent </NavLink>
        <NavLink to='/mail/draft'>Drafts</NavLink>
        <NavLink to='/mail/trash'>Trash</NavLink>
    </nav>
}