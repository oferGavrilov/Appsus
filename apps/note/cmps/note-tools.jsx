
import { NoteColor } from './note-color.jsx' ;

const { useState } = React



export function NoteTools({ note, onRemoveNote , onChangeColor , onDuplicateNote}) {
    // console.log(note)

    const [togglePalette , setTogglePalette] = useState(false)
    console.log(togglePalette)
    function closePalette() {
        console.log('close palette')
        setTogglePalette(false)
    }

    return <div className="note-tools">
        <div className="buttons-container">
            <button className='fa-regular fa-trash-can' onClick={() => onRemoveNote(note.id)}></button>
            <button className='fa-solid fa-palette' onClick={() => setTogglePalette(!togglePalette)}></button>

            {togglePalette && <NoteColor note={note}  onChangeColor={onChangeColor} closePalette={closePalette}/>}
            <button className='fa-regular fa-clone' onClick={() => onDuplicateNote(note.id)}></button>
        </div>
    </div>
}