# Product Decisions and Assumptions for Gate 2

| Topic | Proposed decision | Basis / implication |
|---|---|---|
| Platform | Standalone browser app in one HTML file | Required final deliverable; no backend. |
| Identity and storage | No account; data stays in browser local storage | Supports offline single-user use; users must export backups and data will not sync between browsers/devices. |
| Notifications | In-app reminders/planning only; no claim of background delivery | A standalone static file cannot ensure scheduled notifications when closed. This is a deliberate scope reduction from BR-05. |
| Contact/calendar import | Deferred | No platform permission APIs or server integration in the standalone deliverable; users enter birthdays manually or restore JSON. |
| Leap day | February 29 birthdays are observed February 28 in non-leap years | Makes the behavior explicit and deterministic; stored date remains February 29. |
| Categories | Offer practical editable relationship labels; no shared group behavior | Supports filtering without implying multi-user sharing. |
| Data portability | JSON export/import | Mitigates local-only storage risk while keeping data user-controlled. |
| AI features | Deferred | BRD says core reminders must not depend on AI; not needed for the MVP reminder workflow. |

## Open decisions for user
1. Approve February 28 as the non-leap-year observation date for February 29 birthdays?
2. Approve browser-local storage with manual JSON backup/import for this standalone deliverable?
3. Approve in-app reminders only, with system notifications and imports deferred?
