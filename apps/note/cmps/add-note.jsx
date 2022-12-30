import { noteService } from "../services/note.service.js"
import { CreateTodos } from "./create-todos.jsx"
import { NoteTypeBtns } from "./note-type-btns.jsx"

const { useState } = React

export function AddNote({ onSaveNote }) {

    const [noteToAdd, setNoteToAdd] = useState(noteService.createEmptyNote())
    const [noteType, setNoteType] = useState(null)

    function handleChange({ target }) {
        console.log(target)
        let { value, name: field } = target
        setNoteToAdd((prevNote) => {
            return { ...prevNote, [field]: value }
        })
    }

    function onSubmitNote(ev) {
        ev.preventDefault()
        noteToAdd.type = noteType

        const { type, txt, url } = noteToAdd
        if (type === "note-txt" && !txt || type === "note-img" && !url) return

        onSaveNote(noteToAdd)
        setNoteToAdd(noteService.createEmptyNote())
    }

    function onChangeType(ev) {
        ev.preventDefault()
        const type = ev.target.value
        setNoteType(type)
    }

    function onCloseInput(ev) {
        if (ev.relatedTarget) return
        console.log('entered')
        setNoteType(null)
    }

    return <section className='add-note'>
        <form onBlur={(ev) => onCloseInput(ev)} onSubmit={onSubmitNote}>
            {noteType === 'note-txt' &&
                <input type="text"
                    name="txt"
                    placeholder="Take a note..."
                    value={noteToAdd.txt}
                    autoComplete = 'off'
                    autoFocus
                    onChange={handleChange} />
            }
            {noteType === 'note-img' &&

                <div>
                    <input type="text"
                        name="txt"
                        placeholder="Enter a title..."
                        value={noteToAdd.txt}
                        autoFocus
                        onChange={handleChange} />

                    <input type="text"
                        name='url'
                        placeholder="Enter image URL"
                        value={noteToAdd.url}
                        onChange={handleChange} />

                </div>
            }
            {noteType === 'note-video' &&
                <div>
                    <input type="text"
                        name="txt"
                        placeholder="Enter a title..."
                        value={noteToAdd.txt}
                        autoFocus
                        onChange={handleChange} />

                    <input type="text"
                        name="url"
                        placeholder="Enter video URL"
                        value={noteToAdd.url}
                        onChange={handleChange} />

                </div>
            }
            {noteType === 'note-todos' &&
                    <CreateTodos handleChange={handleChange} />
            }
            {noteType && <button>Create</button>}
        </form>
        <NoteTypeBtns onChangeType={onChangeType} />
    </section>

}