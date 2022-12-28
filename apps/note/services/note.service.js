import { storageService } from '../../../services/async-storage.service.js'


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
    createEmptyNote
}


function query(filterBy = getDefaultFilter()) {

    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const txtRegex = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => txtRegex.test(note.info.txt))
            }
            return notes
        })
    // TODO: consider what filter by key is general
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function getUser() {
    return {
        email: 'momo@appsus.com',
        fullname: 'Momo Ben Momo'
    }
}

function save(note) {
    // if (note.id) {
    //     return storageService.put(NOTE_KEY, note)
    // } else {
    //     return storageService.post(NOTE_KEY, note)
    // }
    return storageService.post(NOTE_KEY, note)
}

function getDefaultFilter() {
    return { txt: '' }
}

function getEmptyNote() {
    return {
        type: 'note-txt',
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
        txt:''
    }
}


function _createNotes() {

    let notes = loadNotesFromStorage()
    if (!notes || !notes.length) {
        notes = [
            {
                id: "n101",
                type: "note-txt",
                isPinned: false,
                // info: {
                //     txt: "Working on Appsus!"
                // }
                txt:"Working on Appsus!"
            }, {
                id: "n102",
                type: "note-txt",
                isPinned: false,
                // info: {
                //     txt: "Need to sleep!"
                // }
                txt:"Need to sleep!"
            }, {
                id: "n103",
                type: "note-txt",
                isPinned: true,
                // info: {
                //     txt: "Alex the greatest metargel!"
                // }
                txt:"Alex the greatest metargel!"
            },
        ]
        saveNotesToStorage(notes)
    }
}
