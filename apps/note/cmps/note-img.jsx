import { NoteTools } from "./note-tools.jsx"

export function NoteImg({note , onRemoveNote , onChangeColor}) {
    console.log('imgNote' , note )



    return <div className="note-img-container">
        <img src={note.url} className={'note-img'} alt="" />
        <div className="note-img-text" style={{ backgroundColor: note.backgroundColor }}>
            <h2>{note.txt}</h2>
            <NoteTools note={note} onRemoveNote={onRemoveNote} onChangeColor={onChangeColor}/>
        </div>
    </div>
}