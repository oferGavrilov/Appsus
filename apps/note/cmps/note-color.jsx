import { noteService } from "../services/note.service.js"


export function NoteColor({ note, onChangeColor }) {
    const colors = noteService.getColors()


    return (

        <div className="color-palette">
            {colors.map((color, idx) => (
                <span className="color-pick"
                    key={idx}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                        onChangeColor(note, color)
                    }}
                ></span>
            ))}
        </div>
    )
    

}
    
    