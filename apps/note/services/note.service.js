import { storageService } from '../../../services/async-storage.service.js'
import { utilService} from '../../../services/util.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getEmptyNote,
    saveNotesToStorage,
    loadNotesFromStorage,
    getUser,
    createEmptyNote,
    updateNote,
    getColors,
    changeColor,
    duplicateNote,
    getDefaultTodo,
    toggleCheck,
    togglePinNote
}


function query(filterBy = getDefaultFilter()) {

    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const txtRegex = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => txtRegex.test(note.txt))
            }
            if(filterBy.type){
                console.log('enter')
                notes = notes.filter(note => note.type === filterBy.type)
            }
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function changeColor(noteId , color) {
    const notes = loadNotesFromStorage()
    const noteToChange = notes.find(note => note.id === noteId)
    noteToChange.backgroundColor = color
    saveNotesToStorage(notes)
    return Promise.resolve(notes)
}

function duplicateNote(noteId) {
    const notes = loadNotesFromStorage()
    const note = notes.find(note => note.id === noteId)
    const copyNote = {...note }
    copyNote.id = utilService.makeId()
    notes.unshift(copyNote)
    saveNotesToStorage(notes)
    return Promise.resolve(copyNote)
}

function toggleCheck(idx , noteId) {
    const notes = loadNotesFromStorage()
    const note = notes.find(note => noteId === note.id)
    note.todos[idx].isDone = !note.todos[idx].isDone
    saveNotesToStorage(notes)
    return Promise.resolve(notes)
}

function togglePinNote(noteId) {
    const notes = loadNotesFromStorage()
    const note = notes.find(note => note.id === noteId)
    const noteIdx = notes.findIndex(note => note.id === noteId)
    note.isPinned =!note.isPinned


    if(note.isPinned){
        let temp = notes[0]
        notes[0] = notes[noteIdx]
        notes[noteIdx] = temp
    }else{
        let temp = notes[noteIdx]
        notes[noteIdx] = notes[notes.length -1]
        notes[notes.length -1] = temp
    }
    
    saveNotesToStorage(notes)
    return Promise.resolve(notes)
}

function getUser() {
    return {
        email: 'momo@appsus.com',
        fullname: 'Momo Ben Momo'
    }
}

function getColors() {
    return [
        '#FFFFFF',
        '#F28B82',
        '#FBBC04',
        '#FFF475',
        '#CCFF90',
        '#A7FFEB',
        '#CBF0F8',
        '#F1E4DE',
        '#D7AEFB',
        '#FDCFE8',
        '#E6C9A8',
        '#E8EAED',
    ]
}

function save(note) {
    // if (note.id) {
    //     return storageService.put(NOTE_KEY, note)
    // } else {
    //     return storageService.post(NOTE_KEY, note)
    // }
    return storageService.post(NOTE_KEY, note)
}

function updateNote(note) {
    return storageService.put(NOTE_KEY, note)
}

function getDefaultFilter() {
    return { txt: '' , type:''}
}

function getDefaultTodo() {
    return [
        {
            txt:''
        }
    ]
}

function getEmptyNote() {
    return {
        type: '',
        isPinned: false,
        info: {
            txt: ''
        }
    }
}


function saveNotesToStorage(notes) {
    storageService.saveToStorage(NOTE_KEY, notes)
}

function loadNotesFromStorage() {
    return storageService.loadFromStorage(NOTE_KEY)
}

function createEmptyNote() {
    return {
        type:'note-txt',
        isPinned:false,
        // info: {
        //     txt: '',
        // }
        txt:'',
        url:'',
        todos: [],
        backgroundColor:'#fff'
    }
}


function _createNotes() {

    let notes = loadNotesFromStorage()
    if (!notes || !notes.length) {
        notes = [
            {
                id: "n101",
                type: "note-txt",
                isPinned: true,
                // info: {
                //     txt: "Working on Appsus!"
                // }
                txt:"Working on Appsus!",
                backgroundColor:'#fff'
            },
             {
                id: "n102",
                type: "note-txt",
                isPinned: false,
                // info: {
                //     txt: "Need to sleep!"
                // }
                txt:"Need to sleep!",
                backgroundColor:'#fff'

            },
             {
                id: "n103",
                type: "note-txt",
                isPinned: false,
                // info: {
                //     txt: "Alex the greatest metargel!"
                // }
                txt:"Alex the greatest metargel!",
                backgroundColor:'#fff'

            },
             {
                id: "n104",
                type: "note-txt",
                isPinned: false,
                // info: {
                //     txt: "Alex the greatest metargel!"
                // }
                txt:"render the notes when color is changed",
                backgroundColor:'#fff'

            },
             {
                id: "n105",
                type: "note-img",
                isPinned: false,
                // info: {
                //     txt: "Alex the greatest metargel!"
                // }
                txt:"Alex the greatest metargel!",
                url:"http://coding-academy.org/books-photos/14.jpg",
                backgroundColor:'#fff'

            },
             {
                id: "n106",
                type: "note-video",
                isPinned: false,
                // info: {
                //     txt: "Alex the greatest metargel!"
                // }
                txt:"Alex the greatest metargel!",
                url:'https://www.youtube.com/embed/hQAHSlTtcmY',
                backgroundColor:'#fff'

            },
             {
                id: "n107",
                type: "note-todos",
                isPinned: false,
                txt:"Alex the greatest metargel!",
                backgroundColor:'#fff',
                // info: {
                //     txt: "Alex the greatest metargel!"
                // }
                todos:[
                    {
                        txt:'Something todo',
                        isDone:false,
                    },
                    {

                        txt:'Something todo2',
                        isDone:false,
                    },
                ],
            },
        ]
        saveNotesToStorage(notes)
    }
}