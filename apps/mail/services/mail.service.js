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
    getUser,
    getUnreadMailsCount,
    deleteMail,
    move,
    setMailsSort
}


function query(filterBy = getDefaultFilter()) {

    return storageService.query(MAIL_KEY)
        .then(mails => {

            if (filterBy.status) {
                mails = mails.filter(mail => mail.status === filterBy.status)
            }

            if (filterBy.txt) {
                const txtRegex = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => txtRegex.test(mail.subject))
            }
            if (filterBy.isRead !== null) {
                // Change this!!
                mails = mails.filter(mail => mail.isRead === filterBy.isRead)
            }

            if (filterBy.isStarred !== null) {
                mails = mails.filter(mail => mail.isStarred)
            }

            if (filterBy.labels.length) {
                mails = mails.filter(mail => filterBy.labels.find(label => mail.labels.includes(label)))
            }

            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function getUnreadMailsCount(mails, status) {
    return mails.reduce((acc, mail) => {
        if (!mail.isRead && mail.status === status) acc++
        return acc
    }, 0)
}

function getUser() {
    return {
        email: 'momo@appsus.com',
        fullname: 'Momo Ben Momo'
    }
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function deleteMail(mail) {
    if (mail.status === 'trash') return remove(mail.id)
    mail.status = 'trash'
    mail.removedAt = Date.now()
    return storageService.put(MAIL_KEY, mail)
}

function move(mail, moveTo, isDuplicate = false) {
    // if (isDuplicate) {
    //     mailDup = { ...mail, status: moveTo }
    //     return storageService.post(MAIL_KEY, mail)
    // }
    mail.status = moveTo
    return storageService.put(MAIL_KEY, mail)
}

function getDefaultFilter() {
    return {
        status: 'inbox',
        txt: '',
        isRead: null,
        isStarred: null,
        labels: []
    }
}

function setMailsSort(mails, sortBy) {
    console.log('sortBy:', sortBy)
    console.log('mails:', mails)
    switch (sortBy) {
        case 'subject': return (mails.sort((m1, m2) => m1.subject.localeCompare(m2.subject)))
        case 'date': return (mails.sort((m1, m2) => m2.sentAt - m1.sentAt))
    }

    // return mails
}

function getEmptyMail() {
    return {
        subject: '',
        body: '',
        isRead: false,
        sentAt: '',
        removedAt: null,
        from: 'momo@appsus.com',
        to: '',
        status: 'sent',
        isStarred: false,
        labels: []
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
                subject: `It's here! The AppSus!`,
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
                removedAt: null,
                from: 'itzik@appsus.com',
                to: 'momo@appsus.com',
                status: 'inbox'
            },
            {
                id: 'e102',
                subject: 'Could you please help me out?',
                body: `Hi Momo,
                I just read your post. It's both well written and useful. I especially like how you write.
                I am emailing you today to let you know I have written the post response.                
                I think you will find it useful, as it is relevant to your post . Could you take a quick peek at it and let me know what you think?`,
                isRead: false,
                sentAt: (Date.now() - 14500),
                removedAt: null,
                from: 'spamalot@appsus.com',
                to: 'momo@appsus.com',
                status: 'inbox'
            }, {
                id: 'e103',
                subject: 'Your readers will love this!',
                body: `Hi Momo
                I'm a big fan of your website. I like the products you review here. One of my favorites is the review for AppSus
                We have a product like it called bugSus that we just launched, and we were wondering if you'd like to write a review about it
                `,
                isRead: true,
                sentAt: (Date.now() - 34000000),
                removedAt: null,
                from: 'spamabit@appsus.com',
                to: 'momo@appsus.com',
                status: 'inbox',
                isStarred: false
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
                sentAt: (Date.now() - 10000000),
                removedAt: null,
                from: 'dontreply@appsus.com',
                to: 'momo@appsus.com',
                status: 'inbox',
                isStarred: true
            }, {
                id: 'e105',
                subject: 'About your free consultation with YouTube!',
                body: `Hi Momo,
                Thank you for signing up for the free consultation. I am looking forward to speaking with you.
                If you have any questions about the call, just reply to this email. I will get back to you ASAP.
                Thank you,`,
                isRead: true,
                sentAt: (Date.now() - 10505000),
                from: 'youtube@appsus.com',
                to: 'momo@appsus.com',
                status: 'inbox',
                isStarred: true
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
                sentAt: (Date.now() - 12000000),
                from: 'fan@appsus.com',
                to: 'momo@appsus.com',
                status: 'inbox',
                isStarred: false
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
                sentAt: (Date.now() - 15000000),
                from: 'issac@appsus.com',
                to: 'momo@appsus.com',
                status: 'inbox',
                isStarred: false
            }, {
                id: 'e108',
                subject: 'Help us to help serve you better',
                body: `Hi Momo
                Hope you've been enjoying our services so far.
                We want to continue offering the best service.
                Please be honest with your responses. If you didn't like something, don't be afraid to point it out. We take feedback very seriously and are ready to make changes to help serve you better.
                Thank you`,
                isRead: true,
                sentAt: (Date.now() - 315000000),
                removedAt: null,
                from: 'avi@appsus.com',
                to: 'momo@appsus.com',
                status: 'inbox',
                isStarred: true
            },

            {
                id: 'e109',
                subject: 'Dear friend Avi',
                body: `Avi i tried reaching out yesterday but
                    you didn't pick my call, call me back
                    `,
                isRead: true,
                sentAt: (Date.now() - 10000000),
                removedAt: null,
                status: 'sent',
                to: 'avi233@appsus.com',
                from: 'momo@appsus.com',
                isStarred: false
            },

            {
                id: 'e110',
                subject: 'business meeting',
                body: `Hi, in won't be at work until sunday,
                    try contacting me when im back.
                Thank you, Momo`,
                isRead: true,
                sentAt: (Date.now() - 20000000),
                status: 'trash',
                to: 'greener@appsus.com',
                from: 'momo@appsus.com',
                isStarred: false
            },

            {
                id: 'e111',
                subject: 'Send money please',
                body: `Hi i don't have a job for a while now
                    please fund me when im watching tv`,
                isRead: true,
                sentAt: (Date.now() - 30000000),
                status: 'sent',
                to: 'bituahleumi@appsus.com',
                from: 'momo@appsus.com',
                isStarred: false
            },

            {
                id: 'e112',
                subject: 'Delivery',
                body: `Hi my food was delievered to me cold
                       don't be afraid to send me pitzoi.
                Thank you, Momo`,
                isRead: true,
                sentAt: (Date.now() - 40000000),
                status: 'sent',
                to: 'wolt@appsus.com',
                from: 'momo@appsus.com',
                isStarred: true
            },

            {
                id: 'e113',
                subject: 'Help you to help me serve me better',
                body: `Hi 
                i want you to continue offering the best service.
                Please be honest with your responses. If you didn't like something, don't point it out. .
                Thank you, Momo`,
                isRead: true,
                sentAt: (Date.now() - 50000000),
                status: 'sent',
                to: 'foodservice@appsus.com',
                from: 'momo@appsus.com',
                isStarred: false
            },

            {
                id: 'e114',
                subject: 'I support you guys',
                body: `Hi,
                Thank you, Momo`,
                isRead: true,
                sentAt: (Date.now() - 60000000),
                status: 'sent',
                to: 'atzlanim@appsus.com',
                from: 'momo@appsus.com',
                isStarred: true
            },

            {
                id: 'e115',
                subject: 'Help me',
                body: `Hi , please send help
                Thank you, Momo`,
                isRead: true,
                sentAt: (Date.now() - 70000000),
                status: 'sent',
                to: 'sos@appsus.com',
                from: 'momo@appsus.com',
                isStarred: true
            }

        ]
    }
    saveMailsToStorage(mails)
}




