import { noteService } from "../services/note.service.js"

const { useState } = React

export function NoteFilter({ onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(noteService.getDefaultFilter())

    function handleChange({ target }) {
        let { value, name: field } = target
        setFilterByToEdit((prevFilter) => {
            return { ...prevFilter, [field]: value }
        })
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        let { value , name:field} = ev.target
        
        if(filterByToEdit.type === value) value = ''

        setFilterByToEdit((prevFilter)=> {
            return {...prevFilter, [field]: value }
        })
        filterByToEdit.type = value

        onSetFilter(filterByToEdit)
    }

    return <section className="note-filter">
        <form onSubmit={onSubmitFilter}>
            <input type="text"
                name="txt"
                className="search-input"
                placeholder="Search..."
                value={filterByToEdit.txt}
                onChange={handleChange} />

            <button className="search-btn">Search</button>
        </form>
        <ul>
            <button name="type" value='note-txt' onClick={onSubmitFilter} className='fa-solid fa-font'></button>
            <button name="type" value='note-todos' onClick={onSubmitFilter} className='fa-solid fa-list'></button>
            <button name="type" value='note-img' onClick={onSubmitFilter} className='fa-regular fa-image'></button>
            <button name="type" value='note-video' onClick={onSubmitFilter} className="fa-brands fa-youtube"></button>
        </ul>
    </section>
}