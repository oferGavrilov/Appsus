const {useState , Fragment} = React

export function CreateTodos({handleChange}) {

    let [noteTodos , setNoteTodo] = useState([{txt : ''}])

    function handleTodoChange({target} , idx) {
        console.log(target.value , idx)
        noteTodos[idx].txt = target.value

        noteTodos = noteTodos.filter(todo =>  todo !== '')

        setNoteTodo(noteTodos)
        handleChange({target: {value:noteTodos , name: 'todos'}})
    }

    function createNewLine() {
        noteTodos.push({txt:''})
    }

    return (<Fragment>
        {noteTodos.map((todo , idx) => (
            <input type="text"
            key={idx}
            name='todos'
            onFocus={createNewLine}
            autoComplete="off"
            className= 'todo-input'
            placeholder= "Type something to do..."
            value={todo.txt}
            onChange={(ev) => handleTodoChange(ev , idx)} />
        ))}
    </Fragment>
    )
}