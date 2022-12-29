
// 1. בניית שלד לאפליקציה:
// * היררכיית קבצים נכונה
// * בסיס קומפוננטות ידועות מראש (בלי לוגיקה, בלי עיצוב, רק קובץ ריק)
// * הגדרת כל הראוטים באפליקציה
// * הבאת סרוויסים נחוצים, קומפוננטות ריוזאביליות

//


// Email App - apps - mail
// Cmps :
// Main - mail - index
// MailList - MailPreview
// MailFilter
// LongText
// CreateEmail
// services:
// mail.service
//
//
// Note App - apps - note
// Cmps:
// Main - NoteIndex
// NoteList - NotePreview
// NoteFilter
// AddNote
// (Dynamic cmp)
//
//
// Services:
// note.service
//
// General:
// Cmps:
// AppHeader
// UserMsg
//
//
// Services:
// async-storage-service
// utils-service
// event-bus-service



// const { useParams, useNavigate, Link } = ReactRouterDOM


// MAIL - TODO
// First prio - css
// Fix names - email instead of mails
// Add email functions - Formatted date, delete, unread
// Sent,Drafts,Trash,Starred, Labels cmps
// Filtering cmp


{/* <div className='read-mail'>
    {<i onClick={onToggleRead} {mail.isRead ?  className='unread fa-regular fa-envelope' title='Mark as unread'> :
        :  class="fa-regular fa-envelope-open" title='Mark as read'></i>
    }
</div> */}