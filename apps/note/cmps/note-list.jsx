
import { NotePreview } from "./note-preview.jsx"

export function NoteList({notes , onRemoveNote }) {
    // console.log(notes)
    return <div className='note-list'>
        {
            notes.map(note => <div key={note.id}> 
                <NotePreview note={note} onRemoveNote={onRemoveNote}/>
                
                </div>)

        }
    </div>

}
