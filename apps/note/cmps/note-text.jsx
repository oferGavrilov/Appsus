// import { noteService } from "../services/note.service.js"
import { NoteTools } from "./note-tools.jsx"

const { useState } = React

export function NoteText({ note, onRemoveNote, onChangeColor , onEditText , onDuplicateNote , onPinNote}) {

  const [noteText, setNoteText] = useState(note.txt)

  function changeHandle({ target }) {
    const { value } = target
    setNoteText(value)
  }

  function onResize({ target }) {
    target.style.height = 'inherit'
    target.style.height = `${target.scrollHeight}px`
  }

  return (<div className="note-text-container" style={{ backgroundColor: note.backgroundColor }}>
    <textarea
      onChange={changeHandle}
      value={noteText}
      onInput={onResize}
      onClick={onResize}
      onBlur={() => onEditText(note , noteText)}
      className='note-text'
    >
      {noteText}
    </textarea>
    <button className={`fa-solid fa-thumbtack pin-btn ${note.isPinned ? 'pinned' : '' }`} onClick={() => onPinNote(note.id)}></button>
    <NoteTools note={note} onRemoveNote={onRemoveNote} onChangeColor={onChangeColor} onDuplicateNote={onDuplicateNote} />
  </div>)
}