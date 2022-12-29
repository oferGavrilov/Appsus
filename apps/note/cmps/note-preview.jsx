// import { noteService } from "../services/note.service.js"
import { NoteImg } from "./note-img.jsx"
import { NoteText } from "./note-text.jsx"

// const {useState ,useEffect} = React

export function NotePreview(props) {
    // const [cmpType , setCmpType] = useState(null)
    // const [noteEdit , setNoteEdit] = useState(null)


    function dynamicCmp() {
        switch (props.note.type) {
            case 'note-txt':
                return <NoteText {...props } />
            case 'note-img':
                return <NoteImg {...props } />
            // case 'note-video':
            //     return <NoteVideo {...props} />
            // case 'note-todos':
            //     return <NoteTodos {...props} />
        }
    }    

   

    return <article className='note-preview'>
        {dynamicCmp()}
            {/* <DynamicCmp note={note} onRemoveNote={onRemoveNote} onChangeColor={onChangeColor}/> */}
    </article>
}