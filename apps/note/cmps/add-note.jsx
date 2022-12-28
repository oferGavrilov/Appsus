import { noteService } from "../services/note.service.js"

const {useState, useEffect} = React

export function AddNote({onSaveNote}) {

    const [noteToAdd , setNoteToAdd] = useState(noteService.createEmptyNote())

    function handleChange({target}) {
        let {value , name:field} = target
        setNoteToAdd((prevNote) => {
            return {...prevNote , [field]: value}
        })
    }

    function onSubmitNote(ev) {
        ev.preventDefault()
        // console.log(noteToAdd)
        onSaveNote(noteToAdd)
    }

    return <section className='add-note'>
        <form onSubmit={onSubmitNote}>
            <input type="text" 
            name="txt"
            placeholder="Take a note..."
            value={noteToAdd.txt}
            onChange={handleChange} />

            <button>Create</button>
        </form>

    </section>

}