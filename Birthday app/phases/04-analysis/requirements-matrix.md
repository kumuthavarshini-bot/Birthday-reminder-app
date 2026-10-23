# Requirements Analysis and Traceability

**Status:** Proposed for Gate 5 approval

| Product requirement | Source | Priority | Observable behavior / validation |
|---|---|---|---|
| Store a birthday with name and month/day; year optional | PD-01; BR-02 | Must | Save valid entry without birth year; no age shown. |
| Edit/delete records | PD-02; BR-08 | Must | Changes reflect immediately; deletion requires confirmation. |
| Sort upcoming by next occurrence | PD-03; BR-04 | Must | Correct date order across year boundary; today is first and highlighted. |
| Search/filter | PD-04; BR-08 | Must | Search name/category and reset to full list. |
| Relationship and notes | PD-05; BR-07 | Must | Optional fields persist and remain editable. |
| Mark celebrated and note action | PD-06; BR-09/11 | Should | State is associated with next occurrence/year and can be changed. |
| Reminder lead time | PD-07; BR-05/06 | Must | In-app countdown/planning cues; honest notice that background notifications are unsupported. |
| JSON backup and restore | PD-08; Research finding 1 | Must | Export valid JSON; validate imports before applying; explicit merge/replace confirmation. |
| Leap day policy | PD-09; BRD §6.3 | Must | February 29 observed February 28 in non-leap years; original birthday date retained. |
| Age only when birth year known | PD-10; BRD §6.3 | Must | Age computed using upcoming/current-year date without showing for unknown year. |
| Data remains local | Research finding 3; BRD §10 privacy | Must | No network requests; handle storage unavailable/quota errors without false success. |
| File URL persistence is variable | Research finding 1 | Constraint | Explain best-effort persistence and prompt for backup; no claim of guaranteed cross-browser persistence. |
| Accessible interactions | BRD §9 | Must | Semantic controls, labels, keyboard operation, visible focus, status announced for dynamic updates. |

## Data model (proposed)

- `id`: stable unique string.
- `name`: required trimmed string.
- `month`, `day`: required integers; validate against a leap-year calendar to permit February 29.
- `birthYear`: optional plausible integer; age remains hidden when absent.
- `relationship`: optional category string.
- `notes`, `giftPreferences`: optional text.
- `reminderDays`: selected lead-time integers; defaults are user-visible in-app cues only.
- `celebrations`: optional map/list keyed by occurrence year with acknowledged flag and note.
- `createdAt`, `updatedAt`: optional ISO timestamps for backup maintenance, not used to determine birthday order.

Avoid storing sensitive details beyond user-entered notes. JSON export contains all app data and must be described as sensitive.

## Date and state rules
1. Treat birthdays as calendar dates, not timestamps; construct dates from local calendar components to avoid UTC parsing shifts.
2. Upcoming occurrence is the next date on or after the current local calendar day. Today has zero days remaining.
3. For February 29 in a non-leap year, use February 28 as the occurrence date; retain February 29 as the saved date.
4. Age is current age on the user's local current date (not age at next occurrence). For an upcoming birthday, the displayed age may be the upcoming age; label this explicitly or avoid projecting age to prevent ambiguity. **Proposed resolution:** show current age, not next age.
5. Acknowledgement is per occurrence year and should not suppress later years.

## Storage and import rules
- Attempt localStorage access behind exception handling; distinguish unavailable, quota, malformed, and successful states.
- Do not clear existing data if persistence fails; surface a clear warning that edits may not survive closing the tab.
- Version backup schema. Reject invalid root/version; validate each record and report skipped invalid records.
- Import must preview counts and offer merge vs replace. Merge should avoid accidental overwrites; matching IDs or normalized name+month/day can be flagged as possible duplicates, not silently merged.
- Export/import data only after explicit user action; no remote transfer.

## Questions to resolve before Design
1. Should age be displayed as current age or upcoming age? Proposed current age with a clear label.
2. Which relationship categories should appear by default, and can the user add custom categories?
3. Should import's default path be merge or replace? Proposed require explicit choice, with merge selected only after preview.
