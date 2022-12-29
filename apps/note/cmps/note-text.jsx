// import { noteService } from "../services/note.service.js"
import { NoteTools } from "./note-tools.jsx"

const { useState } = React

export function NoteText({ note, onRemoveNote, onChangeColor , onEditText }) {

  const [noteText, setNoteText] = useState(note.txt)


  function changeHandle({ target }) {
    const { value } = target
    // console.log(value)
    setNoteText(value)
  }

  function onResize({ target }) {
    target.style.height = 'inherit'
    target.style.height = `${target.scrollHeight}px`
  }

  // function onSaveChange() {
  //   note.txt = noteText
  //   noteService.updateNote(note)
  // }

  return (<div className="note-text-container" style={{ backgroundColor: note.backgroundColor }}>
    <textarea
      onChange={changeHandle}
      value={noteText}
      
      onClick={onResize}
      onBlur={() => onEditText(note , noteText)}
      className='note-text'
    >
      {noteText}
    </textarea>
    <NoteTools note={note} onRemoveNote={onRemoveNote} onChangeColor={onChangeColor} />
  </div>)
}