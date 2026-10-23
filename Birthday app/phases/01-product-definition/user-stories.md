# User Stories and Acceptance Criteria

| ID | Story | Acceptance criteria | BRD trace |
|---|---|---|---|
| PD-01 | As a user, I can add a birthday with only a name and month/day so a missing birth year does not block tracking. | Name and valid month/day are required; year is optional; saved record appears in upcoming dates. | BR-02; §10 missing birth year |
| PD-02 | As a user, I can edit or delete a record so my list stays accurate. | Edit updates the record and recalculates its next occurrence; delete removes it after a clear confirmation. | BR-08; §10 date changes/deletion |
| PD-03 | As a user, I can see upcoming birthdays ordered by the next occurrence. | Each row shows name, date, and days remaining; today is highlighted; ordering works across year-end. | BR-04; §6.1 |
| PD-04 | As a user, I can search and filter my list so I can find a person quickly. | Search matches names and category; clearing search restores the full chronological list. | BR-08 |
| PD-05 | As a user, I can save relationship context and notes so I can prepare personally. | Relationship/category and notes are optional and can be edited/deleted with the record. | BR-07 |
| PD-06 | As a user, I can mark a birthday celebrated and record what I did. | Acknowledgement is attached to the relevant annual occurrence; user can revise or clear it. | BR-09; BR-11 |
| PD-07 | As a user, I can see a reminder lead time so I know when to prepare. | User can choose in-app lead times; interface states reminders are visible only while using the app and are not background notifications. | BR-05; BR-06; §6.2 |
| PD-08 | As a user, I can back up and restore my data so I can move or recover records. | Export downloads a JSON file; import validates structure, previews/reports invalid records, and requires user confirmation before replacing/adding data. | BRD §8.4 export/deletion; privacy principles |
| PD-09 | As a user, I can track a February 29 birthday consistently. | On non-leap years, it is observed on February 28; the stored birthday remains February 29 and its display distinguishes observed date from birth date. | BRD §6.3 leap-day rule |
| PD-10 | As a user, I can distinguish birthday date from age. | Age is shown only if a birth year is supplied; otherwise no age is inferred or displayed. | BRD §6.3 |
