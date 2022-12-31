import { NoteTools } from "./note-tools.jsx"

const { useState } = React

export function NoteVideo({ note, onRemoveNote, onChangeColor, onEditText , onDuplicateNote ,onPinNote}) {

    const [noteText , setNoteText] = useState(note.txt)

    function handleChange(ev) {
        const value = ev.target.innerText
        setNoteText(value)
    }

    return <section className="note-video-container">
       <iframe width="100%" height='300px' src={`${note.url}`}></iframe>
        
        <div className="note-video-area" style={{ backgroundColor: note.backgroundColor }}>
            <p className="note-video-text"
                onInput={handleChange}
                suppressContentEditableWarning
                contentEditable
                value={noteText}
                onBlur={() => onEditText(note, noteText)} >{note.txt}</p>
            <button className={`fa-solid fa-thumbtack pin-btn ${note.isPinned ? 'pinned' : ''}`} onClick={() => onPinNote(note.id)}></button>


            <NoteTools note={note} onRemoveNote={onRemoveNote} onChangeColor={onChangeColor} onDuplicateNote={onDuplicateNote}/>
        </div>
    </section>
}



// tsJv5m8ovLU