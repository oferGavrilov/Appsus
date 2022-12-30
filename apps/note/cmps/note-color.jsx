import { noteService } from "../services/note.service.js"


export function NoteColor({ note, onChangeColor , closePalette }) {
    const colors = noteService.getColors()


    return (

        <div className="color-palette" onMouseLeave={closePalette}>
            {colors.map((color, idx) => (
                <span className="color-pick"
                    key={idx}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                        onChangeColor(note, color)
                        closePalette()
                    }}
                ></span>
            ))}
        </div>
    )
    

}
    
    