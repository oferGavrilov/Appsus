const { useState, useEffect } = React


import { AddNote } from '../cmps/add-note.jsx'
import { NoteFilter } from '../cmps/note-filter.jsx'
import { NoteList } from '../cmps/note-list.jsx'
import { noteService } from '../services/note.service.js'


export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        loadNotes()
    }, [filterBy])

    function loadNotes() {
        noteService.query(filterBy).then(notes => setNotes(notes))
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onSaveNote(noteToSave) {
        noteService.save(noteToSave)
            .then((note) => {
                const newNotes = [...notes, note]
                setNotes(newNotes)
            })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                const newNotes = notes.filter(note => note.id !== noteId)
                setNotes(newNotes)
            })
    }

    function onChangeColor(note, color) {
        noteService.changeColor(note.id, color)
            .then((notes) => {
                setNotes(notes)
            })
    }

    function onEditText(note , noteText ) {
        // console.log('save change' , note , noteText)
        note.txt = noteText
        noteService.updateNote(note)
    }

    return <section className='note-index'>
        <NoteFilter onSetFilter={onSetFilter} />

        <AddNote onSaveNote={onSaveNote} />

        <NoteList notes={notes} onRemoveNote={onRemoveNote} onChangeColor={onChangeColor} onEditText={onEditText} />
    </section>

}
