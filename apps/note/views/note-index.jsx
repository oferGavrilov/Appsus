const {useState , useEffect} = React


import { AddNote } from '../cmps/add-note.jsx'
import { NoteFilter } from '../cmps/note-filter.jsx'
import { NoteList } from '../cmps/note-list.jsx'
import { noteService } from '../services/note.service.js'


export function NoteIndex() {
    const [notes , setNotes] = useState([])
    const [filterBy , setFilterBy] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        loadNotes()
    }, [filterBy])

    // console.log('notes' , notes)
    function loadNotes() {
        noteService.query(filterBy).then(notes => setNotes(notes))
    }

    function onSetFilter(filterBy) {
        // console.log('filterBy' , filterBy)
        setFilterBy(filterBy)
    }

    function onSaveNote(noteToSave) {
        // console.log('onSaveNote', noteToSave)
        // noteService.save(noteToSave)
        //     .then((note) => {
        //         const notes = [note , ...notes]
        //         setNotes({...notes })
        //     })
    }

    return <section className='note-index'>
        <NoteFilter onSetFilter={onSetFilter} />
        <AddNote onSaveNote={onSaveNote}/>
        <NoteList notes={notes} />
    </section>

}
