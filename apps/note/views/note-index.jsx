
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import { AddNote } from '../cmps/add-note.jsx'
import { NoteFilter } from '../cmps/note-filter.jsx'
import { NoteList } from '../cmps/note-list.jsx'
import { noteService } from '../services/note.service.js'

const { useState, useEffect } = React

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
                showSuccessMsg('Note saved successfully')
                setNotes(newNotes)
            })
            .catch((err) => {
                console.error(err)
                showErrorMsg('Could not save note')
            })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                const newNotes = notes.filter(note => note.id !== noteId)
                showSuccessMsg('Note deleted successfully')
                setNotes(newNotes)
            })
            .catch((err)=> {
                console.error(err)
                showErrorMsg('Could not remove note')
            })
    }

    function onChangeColor(note, color) {
        noteService.changeColor(note.id, color)
            .then((notes) => {
                setNotes(notes)
            })
    }

    function onEditText(note, noteText) {
        note.txt = noteText
        noteService.updateNote(note)
    }

    function onDuplicateNote(noteId) {
        noteService.duplicateNote(noteId)
            .then((note) => {
                const newNotes = [...notes, note]
                showSuccessMsg('Note duplicated successfully')
                setNotes(newNotes)
            })
            .catch((err)=> {
                console.error(err)
                showErrorMsg('Could not duplicate note')
            })
    }

    function onToggleCheck(idx, noteId) {
        noteService.toggleCheck(idx, noteId)
            .then((notes) => {
                setNotes(notes)
            })
    }

    function onPinNote(noteId) {
        console.log(noteId)
        noteService.togglePinNote(noteId)
            .then((notes) => setNotes(notes))
    }

    return <section className='note-index'>
        <NoteFilter onSetFilter={onSetFilter} />

        <AddNote onSaveNote={onSaveNote} />

        <NoteList notes={notes}
            onRemoveNote={onRemoveNote}
            onChangeColor={onChangeColor}
            onEditText={onEditText}
            onDuplicateNote={onDuplicateNote}
            onToggleCheck={onToggleCheck}
            onPinNote={onPinNote} />
    </section>

}
