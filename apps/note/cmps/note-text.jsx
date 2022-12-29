import { noteService } from "../services/note.service.js"
import { NoteTools } from "./note-tools.jsx"

const { useState, useEffect } = React

export function NoteText({ note, onRemoveNote, onChangeColor }) {

  const [noteText, setNoteText] = useState(note.txt)


  function changeHandle({ target }) {
    const { value } = target
    console.log(value)
    setNoteText(value)
  }

  function onResize({ target }) {
    target.style.height = 'inherit'
    target.style.height = `${target.scrollHeight}px`
  }

  function onSaveChange() {
    note.txt = noteText
    noteService.updateNote(note)
  }

  return (<div className="note-text-container" style={{ backgroundColor: note.backgroundColor }}>
    <textarea
      onChange={changeHandle}
      value={noteText}
      
      onInput={onResize}
      onBlur={onSaveChange}
      className='note-text'
    >
      {noteText}
    </textarea>
    <NoteTools note={note} onRemoveNote={onRemoveNote} onChangeColor={onChangeColor} />
  </div>)
}