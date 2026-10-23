# Product Definition — Birthday Reminder App

**Source:** `input/birthday_reminder_app_brd.md` (v1.0, October 2026)  
**Status:** Proposed for Gate 2 approval

## Product vision
Help people remember important birthdays and turn reminders into thoughtful, user-led actions.

## Target user and problem
The initial experience is for a busy person who wants one dependable, low-effort place to record birthdays, see what is coming, and prepare. The BRD also identifies family connectors and thoughtful friends; the MVP should remain useful to them without requiring shared accounts or advanced personalization.

## Proposed first-release product
A privacy-first, browser-based single-user birthday organizer delivered as a standalone HTML file. It stores records locally in the user's browser, presents upcoming dates in chronological order, and supports recording notes and acknowledging a celebration. The interface makes clear that local browser data does not automatically sync or back up across devices.

A static HTML file cannot reliably schedule operating-system notifications, import device contacts/calendar data, provide account/guest cloud sync, or deliver push notifications. Therefore, those BRD capabilities are deferred for this deliverable; the app will provide an in-app upcoming list and reminder preferences/lead-time display without claiming background notification delivery.

## MVP scope
- Add, view, edit, search, and delete birthday records.
- Store name, month/day, optional birth year, relationship/category, notes, and optional gift preferences.
- Show upcoming birthdays in date order, including countdown and a clear today state.
- Repeat annually and handle year-end ordering.
- Apply a documented February 29 rule in non-leap years.
- Let the user acknowledge/celebrate a birthday and optionally note the action.
- Keep data in browser local storage; provide export and import of a portable JSON backup as a user-controlled data safeguard.
- Offer reminder lead-time settings as in-app planning information. Do not imply notifications fire while the app is closed.

## Exclusions for this release
Accounts, cross-device synchronization, shared lists, contact/calendar imports, background/push notifications, AI-generated messages, gift commerce, automatic sending or purchasing, and server-side storage.

## Product principles
1. Core birthday tracking does not depend on AI or a network connection.
2. Collect only information the user chooses to enter.
3. Make persistence and notification limitations visible.
4. Keep user approval in control of any action that could contact another person or spend money.
5. Make dates, keyboard interaction, and screen-reader labels accessible.

## Success measures for this prototype
- A user can add a birthday and see its next occurrence and countdown.
- Records persist across reloads in the same browser profile.
- Editing and deletion update the list correctly.
- Annual date calculations work across New Year and leap-day cases.
- Core actions work with keyboard and expose meaningful labels to assistive technology.

These are prototype acceptance measures, not validated business KPI targets.
