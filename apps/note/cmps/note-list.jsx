
import { NotePreview } from "./note-preview.jsx"

export function NoteList({notes , onRemoveNote , onChangeColor , onEditText , onDuplicateNote ,onToggleCheck}) {
    // console.log(notes)
    return <div className='note-list'>
        {
            notes.map(note =>  
                <NotePreview key={note.id} note={note} onRemoveNote={onRemoveNote} onChangeColor={onChangeColor} onEditText={onEditText} onDuplicateNote={onDuplicateNote} onToggleCheck={onToggleCheck}/>)}
    </div>

}
