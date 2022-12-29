import { noteService } from "../services/note.service.js"
import { NoteImg } from "./note-img.jsx"
import { NoteText } from "./note-text.jsx"

const {useState ,useEffect} = React

export function NotePreview(props) {
    const [cmpType , setCmpType] = useState(null)
    const [noteEdit , setNoteEdit] = useState(null)

    // useEffect(() => { // delete
    //     setCmpType(type)
    // }, [type])

    function dynamicCmp() {
        switch (props.note.type) {
            case 'note-txt':
                console.log('entered txt')
                return <NoteText {...props} />
            case 'note-img':
                console.log('entered img')
                return <NoteImg {...props} />
            // case 'note-video':
            //     return <NoteVideo {...props} />
            // case 'note-todos':
            //     return <NoteTodos {...props} />
        }
    }    

    function onChangeColor(note , color) {
        console.log(note, color)
        noteService.changeColor(note.id , color).then((res) => console.log(res))
    }

    return <article className='note-preview'>
        {/* <h3>{note.txt}</h3> */}
        {dynamicCmp()}
            {/* <DynamicCmp note={note} onRemoveNote={onRemoveNote} onChangeColor={onChangeColor}/> */}
    </article>
}