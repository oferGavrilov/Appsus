import { storageService } from '../../../services/async-storage.service.js'


const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getEmptyMail,
    saveMailsToStorage,
    loadMailsFromStorage,
    getUser
}


function query(filterBy = getDefaultFilter()) {

    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.title) {
                const titleRegex = new RegExp(filterBy.title, 'i')
                mails = mails.filter(mail => titleRegex.test(mail.title))
            }
            if (filterBy.isRead) {
                mails = mails.filter(mail => mail.isRead)
            }

            return mails
        })
    // TODO:
    //  status: 'inbox/sent/trash/draft',
    //  txt: 'puki', // no need to support complex text search
    //  isRead: true, // (optional property, if missing: show all)
    //  isStared: true, // (optional property, if missing: show all)
    //  lables: ['important', 'romantic'] // has any of the labels
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function getUser() {
    return {
        email: 'momo@appsus.com',
        fullname: 'Momo Ben Momo'
    }
}

function save(mail) {
    // if (mail.id) {
    //     return storageService.put(MAIL_KEY, mail)
    // } else {
    //     return storageService.post(MAIL_KEY, mail)
    // }
    return storageService.post(MAIL_KEY, mail)
}

function getDefaultFilter() {
    return { title: '', isRead: '' }
}

function getEmptyMail() {
    return {
        title: '',
        body: '',
        isRead: false,
        sentAt: '',
        to: ''
    }
}

function saveMailsToStorage(mails) {
    storageService.saveToStorage(MAIL_KEY, mails)
}

function loadMailsFromStorage() {
    return storageService.loadFromStorage(MAIL_KEY)
}

function _createMails() {

    let mails = loadMailsFromStorage()
    if (!mails || !mails.length) {
        mails = [
            {
                id: 'e101',
                subject: ` It's here! The AppSus!`,
                body: `Hi Momo
                I hope you're having a wonderful day!
                I am emailing you today to let you know we have opened doors to our AppSus.
                It helps you organize shit.
                To learn more about what it does, read our document
                Make sure you buy it before it shuts down.
                If you have any questions about the product, please respond to this email or use the live chat on the product page. Our staff is waiting to respond to you.
                Thank you`,
                isRead: false,
                sentAt: (Date.now() - 5000),
                to: 'momo@appsus.com'
            },
            {
                id: 'e102',
                subject: 'Could you please help me out?',
                body: `Hi Momo,
                I just read your post. It's both well written and useful. I especially like how you write.
                I am emailing you today to let you know I have written the post response.                
                I think you will find it useful, as it is relevant to your post . Could you take a quick peek at it and let me know what you think?`,
                isRead: false,
                sentAt: (Date.now() - 4500),
                to: 'momo@appsus.com'
            }, {
                id: 'e103',
                subject: 'Your readers will love this!',
                body: `Hi Momo
                I'm a big fan of your website. I like the products you review here. One of my favorites is the review for AppSus
                We have a product like it called bugSus that we just launched, and we were wondering if you'd like to write a review about it
                `,
                isRead: false,
                sentAt: (Date.now() - 4000),
                to: 'momo@appsus.com'
            }, {
                id: 'e104',
                subject: 'We want to partner with you',
                body: `Hello There!
                I have been following you on facebook for a long while now. You share a lot of funny videos, and have built up a loyal following.
                I also noticed that you share a lot of useful products.
                I am reaching out to let you know I have the next product for you to promote MosquitoKiller. It's called . It helps killing mosquitos.
                Please let me know if you would like to promote it. We'll send you a sample of the product. We can also help you create the content, and we'll pay you for your time.
                `,
                isRead: false,
                sentAt: (Date.now() - 3500),
                to: 'momo@appsus.com'
            }, {
                id: 'e105',
                subject: 'About your free consultation with YouTube!',
                body: `Hi Momo,
                Thank you for signing up for the free consultation. I am looking forward to speaking with you.
                If you have any questions about the call, just reply to this email. I will get back to you ASAP.
                Thank you,`,
                isRead: false,
                sentAt: (Date.now() - 3000),
                to: 'momo@appsus.com'
            }, {
                id: 'e106',
                subject: 'I just listened to your podcast!',
                body: `Hi Momo
                I recently discovered your work when I listened to the podcast. You shared so many useful insights there.
                I wanted to let you know I run a podcast too. It's called Appsus, and I was wondering if you'd like to come on the air.
                The podcast has . Prominent people like  have already taken part.
                Would you be interested? I will be happy to interview you at a date and time that is convenient for you.
                Thank you`,
                isRead: false,
                sentAt: (Date.now() - 2500),
                to: 'momo@appsus.com'
            }, {
                id: 'e107',
                subject: 'We cordially invite you to our wedding',
                body: `Hi Momo
                It is that time of the year again when we have our wedding.                
                It is a day where we get married.                
                You have become a valued part of our company, we would love it if you're able to come, but we understand if you can't. 
                Please replay to this email your attendance status.
                Thank you`,
                isRead: false,
                sentAt: (Date.now() - 2000),
                to: 'momo@appsus.com'
            }, {
                id: 'e108',
                subject: 'Help us to help serve you better',
                body: `Hi Momo
                Hope you've been enjoying our services so far.
                We want to continue offering the best service.
                Please be honest with your responses. If you didn't like something, don't be afraid to point it out. We take feedback very seriously and are ready to make changes to help serve you better.
                Thank you`,
                isRead: false,
                sentAt: (Date.now() - 1500),
                to: 'momo@appsus.com'
            },
        ]
        saveMailsToStorage(mails)
    }
}

