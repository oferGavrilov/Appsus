

export function NoteTools({ note , onRemoveNote }) {
    // console.log(note)
    return <div className="note-tools">
        <div className="buttons-container">
            <button className='fa-regular fa-trash-can' onClick={() => onRemoveNote(note.id)}></button>
            <button className='fa-solid fa-palette'></button>
        </div>
    </div>
}