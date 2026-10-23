# Handover — Birthday Book

**Status:** Complete

## Deliverables
- `output/index.html` — self-contained standalone app.
- `output/README.md` — opening instructions, feature summary, data handling, and limitations.
- `output/QA_REPORT.md` — executed checks, results, and items not verified interactively.
- `tests/domain.test.cjs` — date and record-validation tests.

## Release notes
The delivered prototype supports local birthday entry and editing, upcoming-date countdowns, search and relationship filtering, notes, celebration acknowledgement, and JSON backup/restore. February 29 birthdays are observed February 28 in non-leap years. The app contains no external runtime dependencies and does not send data to a service.

## Important operating notes
- Open `output/index.html` in a modern browser.
- Local file browser storage can vary; use JSON backups to preserve data.
- The app does not send background/system notifications or import device contacts/calendars.
- Interactive browser, screen-reader, and visual responsive checks are still outstanding; see the QA report.

## Verification command
Run from the project root: `node --test tests/domain.test.cjs`.
