import { noteService } from "../services/note.service.js"

const {useState } = React

export function NoteFilter({onSetFilter}) {
    const [filterByToEdit , setFilterByToEdit] = useState(noteService.getDefaultFilter())

    function handleChange({target}) {
        let {value, name:field} = target
        setFilterByToEdit((prevFilter) => {
            return {...prevFilter , [field]: value}
        })
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return <section className="note-filter">
        <form onSubmit={onSubmitFilter}>
            <input type="text"
            name="txt"
            placeholder="Search..."
            value={filterByToEdit.txt}
            onChange= {handleChange} />

            <button>Search</button>
        </form>
    </section>
}