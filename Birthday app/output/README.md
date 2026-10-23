# Birthday Book

A standalone, offline birthday organizer delivered as one HTML file.

## Open the app

Open `index.html` in a modern desktop or mobile browser. No server, installation, account, or network connection is required for the app interface.

## Features

- Add, edit, search, filter, and delete birthdays.
- Birth year is optional; age appears only when a year is saved.
- See upcoming birthdays in chronological order with a countdown and a today highlight.
- Save a relationship, notes, gift ideas, and in-app planning lead times.
- Mark an annual occurrence celebrated and add an optional note.
- Ask app-help questions using the embedded approved FAQ; the chatbot works offline and does not access birthday records.
- Export a versioned JSON backup and restore from a backup.
- February 29 birthdays are observed on February 28 in non-leap years while retaining the original birthday date.

## Data and privacy

Birthday data stays in this browser; the app contains no server connection or analytics. Storage for a local HTML file can vary by browser, so automatic persistence is best-effort. Export a JSON backup regularly and keep it somewhere safe. A backup contains personal information and should be protected accordingly. Import validates the selected file and asks whether to merge or replace records.

The chatbot keeps conversation only in page memory, makes no network requests, and cannot read or change birthday records. AI-generated responses are not enabled. The app does not request contact/calendar access, send messages, or schedule system notifications. In-app reminder lead times and the upcoming list are visible while the app is open; they do not alert you while it is closed.

## Files

- `index.html` — self-contained app.
- `README.md` — this guide.
- `QA_REPORT.md` — checks run and their results.
