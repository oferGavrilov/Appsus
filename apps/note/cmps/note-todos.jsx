import { noteService } from "../services/note.service.js"
import { NoteTools } from "./note-tools.jsx"

const {useState} = React
export function NoteTodos({ note ,onRemoveNote, onChangeColor , onEditText , onDuplicateNote , onToggleCheck}) {
    
    const [todos , setTodos] = useState([])

 
    
    
    return <div className="note-todos-container" style={{ backgroundColor: note.backgroundColor }}>
        <ul>
        {note.todos.map((todo, idx) => {
            return (
                <li key={idx}>
                    <button className={`checkbox fa-regular fa-square${todo.isDone ? '-check' : ''}`} 
                    onClick={() => onToggleCheck(idx , note.id)}
                    ></button>
                    <p className={`note-todo ${todo.isDone ? 'checked' : ''}`}>{todo.txt}</p>
                </li>
            )
        })}
        </ul>
        <NoteTools note={note} onRemoveNote={onRemoveNote} onChangeColor={onChangeColor} onDuplicateNote={onDuplicateNote} />
    </div>
}