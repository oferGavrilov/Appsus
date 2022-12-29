import { NoteTools } from "./note-tools.jsx"

const {useState} = React

export function NoteImg({ note, onRemoveNote, onChangeColor , onEditText}) {
    // console.log('imgNote', note)
    const [noteText , setNoteText] = useState(note.txt)


    function handleChange(ev) {
        // const {value} = target
        const value = ev.target.innerText
        // console.log(value)
        setNoteText(value)
    }

    return <div className="note-img-container">
        <img src={note.url} className={'note-img'} alt="" />
        
        <div className="note-img-area" style={{ backgroundColor: note.backgroundColor }}>
            <p className="note-img-text"
             onInput ={handleChange}
             suppressContentEditableWarning
             contentEditable 
            
             value ={noteText}
             onBlur={() => onEditText(note , noteText)} >{note.txt}</p>


            <NoteTools note={note} onRemoveNote={onRemoveNote} onChangeColor={onChangeColor} />
        </div>
    </div>
}