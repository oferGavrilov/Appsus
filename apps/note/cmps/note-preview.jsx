import { NoteImg } from "./note-img.jsx"
import { NoteText } from "./note-text.jsx"

const {useState} = React

export function NotePreview({note , type , onRemoveNote}) {
    const [cmpType , setCmpType] = useState(type)


    // console.log(type)



    function DynamicCmp(props) {
        switch (cmpType) {
            case 'note-txt':
                // console.log('entered txt')
                return <NoteText {...props} />
            case 'note-img':
                // console.log('entered img')
                return <NoteImg {...props} />
            // case 'note-video':
            //     return <NoteVideo {...props} />
            // case 'note-todos':
            //     return <NoteTodos {...props} />
        }
    }    

    return <article className='note-preview'>
        {/* <h3>{note.txt}</h3> */}
        <DynamicCmp note={note} cmpType={cmpType} onRemoveNote={onRemoveNote}/>
    </article>
}