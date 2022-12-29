
import { NoteColor } from './note-color.jsx' ;

const { useState } = React



export function NoteTools({ note, onRemoveNote , onChangeColor }) {
    // console.log(note)

    const [togglePlate , setTogglePlate] = useState(false)

    console.log(togglePlate)
    return <div className="note-tools">
        <div className="buttons-container">
            <button className='fa-regular fa-trash-can' onClick={() => onRemoveNote(note.id)}></button>
            <button className='fa-solid fa-palette' onClick={() => setTogglePlate(!togglePlate)}></button>
            {togglePlate && <NoteColor note={note}  onChangeColor={onChangeColor} />}
        </div>
    </div>
}