const { useState, useEffect } = React
import { mailService } from '../services/mail.service.js'


export function MailFilter({ onSetFilter }) {

    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())


    function handleChange({ target }) {
        let { value, name: field, type, checked } = target
        if (type === 'checkbox') value = !!checked
        setFilterBy(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter() {
        onSetFilter(filterBy)
        console.log('filterBy:', filterBy)
    }


    return <section className='mail-filter'>
        <div>
            <i onClick={onSubmitFilter} className="fa-solid fa-magnifying-glass"></i>

            <input
                type="search"
                name="txt"
                value={filterBy.txt}
                onChange={handleChange}
                placeholder='Search mail'
            />
        </div>

        <label htmlFor="isRead">{filterBy.isRead ? 'Read' : 'Unread'} Mail</label>
        <input type="checkbox"
            name="isRead"
            id="isRead"
            value={filterBy.isRead || ''}
            checked={filterBy.isRead || ''}
            onChange={handleChange} />

    </section>
}
