import { NoteImg } from "./note-img.jsx"
import { NoteText } from "./note-text.jsx"
import { NoteTodos } from "./note-todos.jsx"
import { NoteVideo } from "./note-video.jsx"


export function NotePreview(props) {


    function dynamicCmp() {
        switch (props.note.type) {
            case 'note-txt':
                return <NoteText {...props } />
            case 'note-img':
                return <NoteImg {...props } />
            case 'note-video':
                return <NoteVideo {...props} />
            case 'note-todos':
                return <NoteTodos {...props} />
        }

    }    

   

    return <article className='note-preview'>
        {dynamicCmp()}
            {/* <DynamicCmp note={note} onRemoveNote={onRemoveNote} onChangeColor={onChangeColor}/> */}
    </article>
}