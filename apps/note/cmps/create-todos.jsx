import { noteService } from "../services/note.service.js"

const {useState , Fragment} = React



export function CreateTodos({handleChange}) {

    let [noteTodos , setNoteTodo] = useState([{txt : undefined}])

    function handleTodoChange({target} , idx) {
        console.log(target.value , idx)
        noteTodos[idx] = target.value

        noteTodos = noteTodos.filter(todo =>  todo !== '')

        noteTodos.push('')

        setNoteTodo(noteTodos)

        handleChange({target: {value:noteTodos , name: 'todos'}})
    }
    console.log('createTodos' , noteTodos)

    // function clearTodoLine() {
    //     return noteTodos.filter(todo =>  todo !== '')
    // }

    return (<Fragment>
        {noteTodos.map((todo , idx) => (
            <input type="text"
            key={idx}
            name='todos'
            autoComplete="off"
            className= 'todo-input'
            placeholder= "Type something to do..."
            value={todo.txt}
            onChange={(ev) => handleTodoChange(ev , idx)} />
        ))}
    </Fragment>
    )
}