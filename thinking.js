
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

// Fix loading state
// Fix mail funcs at other sections
// add filter into string params
// add filter and sort options
// fix formatted time func
// fix user msg - maybe add buttons for removing/moving to that section
// Add debounce for email composing more than 5 secs(maybe also at search)
// Improve filtering funcs at service/mail-filter
// Support email labeling
// Make delete,mark,star,label reusable for both details and index(cmp)
// Check how to dynamically limit body text
// support custom nav bar
// Intergration





// Make notes with less width
// fix closing pallete on clicking a color/outside the note
// use event bus for unread count
// add sort to filter
// support adding photo/video to mail
// consider doing  shared header
// work on integration - and about and home page
// should consider composing



// Mail CSS -
// Unread - font-weight - 700
// Read - font-weight - 400px
// Subject, Body -  14px
// Date - normal 12px

// Compose - font-weight 500 14px
// Side bar focused - font-weight 700 14px unread 12px
// Side bar - font weight 400


// Mail-details -
// Subject 22px font weight 400
// from - 14px font weight 700
// date - 12px font weight 400
// body - 16px font weight 400


// ////////
// Colors

// Header -
// Color - black
// Filter -
// Backgruond - #f1f3f4

// Compose -
// Color - #001D35
// Background - #C2E7FF

// Side bar -
// side bar focused -
// Color - #001D35
// Background - rgb(211,227,253)

// side bar normal -
// Color - #202124

// Mail-preview -
// all - Color - #202124
// read - #F2F6FC
// sentAt - Color - #5F6368


// Mail-details -
// Subject - #1F1F1F
// from, sent at - #5E5E5E


// Compose - Color
// header - Color - #041E49 - Background - rgb(242,246,252)
// Background - (255,255,255)
// To - Color -#444746
// Body - #222222
// Funcs - #444444
// Send btn - Color - #FFFFFF


// Icons -
// 