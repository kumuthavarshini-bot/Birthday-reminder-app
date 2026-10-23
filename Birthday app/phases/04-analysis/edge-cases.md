# Edge Cases and Validation Scenarios

| Area | Scenario | Expected behavior |
|---|---|---|
| Date validity | Invalid date such as April 31 | Reject with field-level explanation. |
| Leap date | February 29 record in leap year | Next occurrence is February 29. |
| Leap date | February 29 record in non-leap year | Next occurrence is February 28, clearly shown as observed date. |
| Year boundary | Today is December 31; birthday January 1 | Countdown is one day; January birthday sorts before later next-year dates. |
| Today | Birthday is today | Zero days remaining and distinct today treatment. |
| Missing year | No birth year | Save and show birthday; do not infer/display age. |
| Age | Birthday has not yet occurred this year | Current age remains pre-birthday age. |
| Duplicate | Same normalized name and month/day added | Warn about possible duplicate; allow user to keep both. |
| Storage unavailable | localStorage access throws | App remains usable for current session, warns, and offers immediate export. |
| Storage quota | Save fails | Preserve current in-memory entry and report unsaved persistence; do not show success state. |
| Import malformed | Invalid JSON or schema | Reject without modifying existing data; explain issue. |
| Import partial | Some rows invalid | Show valid/invalid counts and require confirmation before importing valid rows. |
| Import duplicates | Conflicting records | Preview potential duplicates and require explicit merge/replace decision. |
| XSS-like text | Notes contain HTML/script strings | Render as text; never execute imported/user strings as markup. |
| Small screen | Narrow viewport and zoom | Controls remain reachable; list reflows without horizontal page scrolling. |
| Keyboard | Use without pointer | Add/edit/delete/search/filter/export/import actions are keyboard accessible with visible focus. |
