import { noteService } from "../services/note.service.js"
import { NoteTypeBtns } from "./note-type-btns.jsx"

const {useState, useEffect} = React

export function AddNote({onSaveNote }) {

    const [noteToAdd , setNoteToAdd] = useState(noteService.createEmptyNote())
    const [noteType , setNoteType] = useState('note-img')

    function handleChange({target}) {
        let {value , name:field} = target
        setNoteToAdd((prevNote) => {
            return {...prevNote , [field]: value}
        })
    }

    function onSubmitNote(ev) {
        ev.preventDefault()
        if(!noteToAdd.txt) return 

        onSaveNote(noteToAdd)
        setNoteToAdd({txt:''})
    }

    function onChangeType(ev) {
        ev.preventDefault()
        const type = ev.target.value
        // console.log(type)
        setNoteType(type)
    }

    return <section className='add-note'>
        <form onSubmit={onSubmitNote}>
            {noteType === 'note-txt' &&
            <input type="text" 
            name="txt"
            placeholder="Take a note..."
            value={noteToAdd.txt}
            onChange={handleChange} />
        }
        {noteType === 'note-img' &&
            <input type="text" 
            name='url'
            placeholder="Enter image URL"
            value={noteToAdd.url}
            onChange={handleChange} />
            //title
        }
            <button>Create</button>
        </form>
        <NoteTypeBtns onChangeType={onChangeType} />
    </section>

}