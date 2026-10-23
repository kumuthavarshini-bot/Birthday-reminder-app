# QA Report — Birthday Book

**Build:** `output/index.html`  
**Validation date:** 2026-10-23

## Results

| Check | Result | Evidence |
|---|---|---|
| Standalone packaging | Pass | HTML, CSS, and JavaScript are embedded in one file; source and output copies match. |
| External runtime dependencies | Pass | Static scan found no `http://` or `https://` references in the app. |
| HTML structure | Pass (parser check) | Python's standard HTML parser read the document and found 47 unique IDs after chatbot integration. |
| JavaScript syntax | Pass | `node --check` passed for the extracted inline script. |
| Calendar date validation | Pass | Unit test covers valid Feb 29 and invalid April 31. |
| Year-boundary countdown | Pass | Unit test verifies Dec 31 to Jan 1 is one day and in the next year. |
| Leap-day observation | Pass | Unit test verifies Feb 28 in 2025 and Feb 29 in 2028. |
| Age calculation | Pass | Unit test checks before/after birthday behavior, missing year, and future birth year. |
| Import record validation | Pass | Unit test checks malformed date, future year, and valid unknown-year record. |
| Approved FAQ embedding and exact matching | Pass | Tests compare embedded JSON to the approved input and verify approved wording with case/punctuation normalization. |
| Chat fallback and AI-follow-up boundaries | Pass | Tests verify approved fallback and that follow-up text states AI generation is not enabled. |
| Chat storage/network isolation | Pass | Mocked submit-handler test leaves birthday fixture unchanged; chatbot helper scan contains no storage/network access. |
| Existing app action preservation | Pass | Tests assert existing CRUD, list, search, import/export, celebration elements and storage key remain. |
| UI/accessibility hooks (static inspection) | Pass | Chat launcher/close have accessible names, input has a label, message log uses `role=log` and `aria-live=polite`, focus-visible styles exist, and a mobile breakpoint is defined. |
| Sampled color contrast | Pass (calculated) | Defined foreground/background pairs were calculated; lowest sampled ratio is 4.504:1 (`#74777a` on white). This is a token-level calculation, not visual inspection. |
| Keyboard traversal and actual screen-reader output | Not run | Requires interactive browser/device testing. |
| Desktop/mobile visual inspection | Not run | Existing app tab is a local file. Browser automation has blocked local-file navigation; no alternate route was used. |

## Automated domain tests

Command: `node --test tests/chatbot.test.cjs tests/domain.test.cjs`  
Result: **12 passed, 0 failed**.

The date and record tests execute helpers extracted from the standalone app source. The chatbot tests exercise matching, reply construction, repeated and empty submissions, and the submit handler with an in-memory DOM stub; they compare the embedded knowledge base to the approved JSON and confirm that a birthday-data fixture remains unchanged. They do not validate real-browser rendering or browser storage behavior.

## Known limitations

- Browser local storage behavior for locally opened HTML files varies. Users should export JSON backups.
- Background/system notifications and contact/calendar import are not supported.
- Interactive CRUD, actual keyboard traversal, real-browser chatbot layout/focus behavior, import/download UI, responsive layout, reminders and filters in the UI, and assistive-technology behavior still need a manual browser pass.
- The static HTML parser used here checks structure and IDs, not full HTML conformance; legacy `tidy` on the machine does not understand HTML5 landmarks and produced misleading errors.
