# Research Findings

**Status:** Proposed for Gate 4 approval  
**Research type:** Technical desk research; no user interviews, survey, or competitor study.

## Finding 1 — `file://` storage is not a reliable product guarantee
MDN documents that local storage is normally saved across browser sessions, but behavior for documents opened directly from `file:` URLs is undefined and can vary between browsers. Therefore, the Gate 2 assumption that browser local storage provides dependable persistence for the standalone `output/index.html` is not supported as a cross-browser guarantee. ([MDN: Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage))

**Implication:** Keep JSON export/import as a required, user-controlled persistence path. The app can attempt browser storage where available, but must detect errors and clearly communicate that local-file persistence varies by browser. A robust guarantee would need a hosted origin or a user-managed data file, which changes the experience and needs product approval.

## Finding 2 — Web system notifications require permission and a secure context
The Notifications API is restricted to secure contexts in supporting browsers and requires explicit permission for the current origin. ([MDN: Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API), [MDN: requestPermission](https://developer.mozilla.org/en-US/docs/Web/API/Notification/requestPermission_static))

**Implication:** Deferring background/system notifications for the local static file is appropriate. Do not show a permission control or represent in-app reminders as delivered alerts.

## Finding 3 — Local data can be portable through explicit file selection/download
Browser file APIs support user-selected files, and object URLs can represent generated Blob data for browser use/download. ([MDN: Using files from web applications](https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications))

**Implication:** JSON backup/restore is compatible with a standalone app and avoids sending birthdays to a service. Import should validate schema and preview consequences before applying data.

## Finding 4 — User needs remain unvalidated
The BRD personas and proposed business KPIs are hypotheses. This desk research does not establish demand for local-only storage, manual entry, the selected leap-day convention, or the proposed reminder workflow.

**Implication:** Treat the artifact as an MVP prototype. A future product decision should validate these assumptions with prospective users before investing in sync, integrations, or monetization.

## Recommendation
Proceed with the static-file scope only if the product explicitly accepts best-effort browser persistence plus a prominent JSON backup/restore flow. If dependable automatic persistence is a must-have, revisit the product boundary before design/build and consider a hosted app or desktop wrapper. No user data should be transmitted to support this prototype.
