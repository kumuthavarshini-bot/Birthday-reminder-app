# Design — User Flows

**Status:** Proposed for Gate 6 approval

## First open
1. Open the standalone file.
2. See a compact explanation: data is stored in this browser when supported; behavior may vary for local files; export regular JSON backups.
3. Land on the upcoming list with a clear empty state and one primary action: Add a birthday.

## Add a birthday
1. Activate Add a birthday.
2. Enter name and birthday month/day; optionally enter birth year, category, notes, gift preferences, and reminder lead times.
3. Save; validation appears beside the relevant field. On success, return focus to the new list item and announce that it was added.
4. If storage fails, retain the record in the current session, display an unsaved-data banner and offer Export backup.

## Find and prepare
1. Search by name or narrow by category.
2. Review chronological upcoming rows showing next occurrence, countdown, and optional current age/category.
3. Open a person's detail panel to review notes/preferences and configured in-app lead times.
4. Mark the current occurrence celebrated and optionally record a note.

## Edit or delete
1. Open a record's actions or detail panel.
2. Edit fields and save; list ordering/countdown updates.
3. Delete requires a confirmation naming the person. Cancel preserves data; confirm removes it.

## Back up and restore
1. Export downloads a versioned JSON backup; user receives a confirmation.
2. Import opens a file picker and validates selected JSON.
3. Show a preview of records to add, possible duplicates, invalid records, and whether merge or replace is selected.
4. User chooses merge or replace and confirms. Invalid data or cancellation leaves existing records unchanged.
