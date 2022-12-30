const { useState } = React

import { NoteFilter } from '../apps/note/cmps/note-filter.jsx'
import { MailFilter } from '../apps/mail/cmps/mail-filter.jsx'

export function AppFilter() {
    // return <NoteFilter  />
    const [isShown , setIsShown] = useState(false)

    return <form className='filter'>
        <div>

            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text"
                placeholder='Search...' />
            <button onClick={() => setIsShown(!isShown)}><i class="fa-solid fa-filter"></i></button>
        </div>
            {isShown && <div className='something'>
                
                </div>}
    </form>




}