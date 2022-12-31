
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




// Finish layouting
// work on mail details css
// use event bus for unread count
// add sort to filter - add filter to qsp
// support adding photo/video to mail
// should consider not keeping composing in a state
// support labeling mails
// add user msgs
// add loading screen
// add drafts
// add side-bar



// Work on about, home, books pages
// Add logo and favicon
// work on integration - and about and home page
// consider doing  shared header





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

// Mail-details -
// Subject - #1F1F1F
// from, sent at - #5E5E5E

