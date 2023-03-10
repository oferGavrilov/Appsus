import { noteService } from "../services/note.service.js"
import { CreateTodos } from "./create-todos.jsx"
import { NoteTypeBtns } from "./note-type-btns.jsx"
import {showSuccessMsg , showErrorMsg} from '../../../services/event-bus.service.js'


const { useState } = React

export function AddNote({ onSaveNote }) {

    const [noteToAdd, setNoteToAdd] = useState(noteService.createEmptyNote())
    const [noteType, setNoteType] = useState('note-txt')

    function handleChange({ target }) {
        let { value, name: field } = target
        setNoteToAdd((prevNote) => {
            return { ...prevNote, [field]: value }
        })
    }

    function onSubmitNote(ev) {
        ev.preventDefault()
        noteToAdd.type = noteType

        const { type, txt, url, todos } = noteToAdd
        if (type === "note-txt" && !txt || type === "note-img" && !url || type === "note-video" && !url || type === 'note-todos' && !todos.length){
            showErrorMsg('Could not save note')
            return
        } 
        if (type === 'note-todos' && !todos[noteToAdd.length - 1]) todos.pop()
        if (type === 'note-video') {
            onChangeUrl(noteToAdd)
            return
        }

        showSuccessMsg('note added successfully')
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
        setNoteType(null)
    }

    function onChangeUrl(note) {
        const url = note.url
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
        const match = url.match(regExp)
        const id = match && match[7].length == 11 ? match[7] : null
        const newURL = 'https://www.youtube.com/embed/' + id
        noteToAdd.url = newURL
        onSaveNote(noteToAdd)
        setNoteToAdd(noteService.createEmptyNote())
    }

    return <section className='add-note'>
        <form onBlur={(ev) => onCloseInput(ev)} onSubmit={onSubmitNote}>
            {noteType === 'note-txt' &&
                <input type="text"
                    name="txt"
                    placeholder="Take a note..."
                    value={noteToAdd.txt}
                    autoComplete='off'
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
                        autoComplete="off"
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
                        autoComplete="off"
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

            {noteType && <button className="add-note-btn">Create</button>}
        </form>
        <NoteTypeBtns onChangeType={onChangeType} />
    </section>

}