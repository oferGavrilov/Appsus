import { noteService } from "../services/note.service.js"
import { NoteTypeBtns } from "./note-type-btns.jsx"

const { useState, useEffect } = React

export function AddNote({ onSaveNote }) {

    const [noteToAdd, setNoteToAdd] = useState(noteService.createEmptyNote())
    const [noteType, setNoteType] = useState(null)

    function handleChange({ target }) {
        let { value, name: field  } = target
        setNoteToAdd((prevNote) => {
            return { ...prevNote, [field]: value }
        })
    }

    function onSubmitNote(ev) {
        ev.preventDefault()
        noteToAdd.type = noteType
        
        const {type , txt , url} = noteToAdd
        if(type === "note-txt" && !txt || type === "note-img" && ! url) return

        // if(!noteToAdd.txt) return
        onSaveNote(noteToAdd)
        setNoteToAdd(noteService.createEmptyNote())
    }

    function onChangeType(ev) {
        ev.preventDefault()
        const type = ev.target.value

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

                <div>
                    <input type="text"
                        name='url'
                        placeholder="Enter image URL"
                        value={noteToAdd.url}
                        onChange={handleChange} />

                    <input type="text"
                        name="txt"
                        placeholder="Enter a title..."
                        value={noteToAdd.txt}
                        onChange={handleChange} />
                </div>
            }
            {noteType &&<button>Create</button>}
        </form>
        <NoteTypeBtns onChangeType={onChangeType} />
    </section>

}