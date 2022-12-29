import { noteService } from "../services/note.service.js"



export function NoteColor({ note, onChangeColor }) {
    const colors = noteService.getColors()
    console.log(colors)
    return <div className="color-palette">
        {colors.map((color, idx) => {
            return(

                <span className="color-ball"
                key={idx}
                style={{ backgroundColor: color }}
                onClick={() => onChangeColor(note , color)}
                ></span>)
        })}
    </div>
}