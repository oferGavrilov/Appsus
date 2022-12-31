import { NoteTools } from "./note-tools.jsx"

export function NoteTodos({ note, onRemoveNote, onChangeColor, onEditText, onDuplicateNote, onToggleCheck , onPinNote}) {


    return <div className="note-todos-container" style={{ backgroundColor: note.backgroundColor }}>
        <ul>
            {note.todos.map((todo, idx) => {
                return (
                    <li key={idx}>
                        <button className={`checkbox fa-regular fa-square${todo.isDone ? '-check' : ''}`}
                            onClick={() => onToggleCheck(idx, note.id)}
                        ></button>
                        <p className={`note-todo ${todo.isDone ? 'checked' : ''}`}>{todo.txt}</p>
                    </li>
                )
            })}
            <button className={`fa-solid fa-thumbtack pin-btn ${note.isPinned ? 'pinned' : ''}`} onClick={() => onPinNote(note.id)}></button>
        </ul>
        <NoteTools note={note} onRemoveNote={onRemoveNote} onChangeColor={onChangeColor} onDuplicateNote={onDuplicateNote} />
    </div>
}