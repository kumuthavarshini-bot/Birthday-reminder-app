# Roadmap — Birthday Reminder App

**Status:** Proposed for Gate 3 approval  
**Product Definition:** Approved at Gate 2

## Delivery sequence

| Milestone | Scope | Exit evidence | Dependency |
|---|---|---|---|
| R1 — Research | Identify user expectations and constraints for local-only birthday tracking, reminders, privacy, and backups; inspect relevant browser capabilities. | Research notes with source/provenance labels; assumptions confirmed or flagged. | Product Definition approval |
| R2 — Analysis | Convert approved stories to traceable functional, data, privacy, accessibility, and edge-case requirements. | Requirement matrix and test scenarios, including date boundaries and storage failure cases. | Research approval |
| R3 — Design | Define key screens, interaction flows, responsive layout, visual language, and accessibility behavior. | Design specification and reviewable screen implementation plan. | Analysis approval |
| R4 — Build | Implement the approved MVP in `src/` and package a standalone `output/index.html`. | Feature-complete standalone artifact with no runtime network dependency. | Design approval |
| R5 — Validation | Run acceptance, date-edge-case, persistence, import/export, accessibility, and standalone checks. | QA report records commands/methods, outcomes, and limitations; defects triaged. | Build complete |
| R6 — Handover | Finalize deliverable docs and release notes. | `output/index.html`, `output/README.md`, `output/QA_REPORT.md` reviewed and complete. | Validation approval |

## MVP priority order
1. Reliable date model and upcoming-birthday ordering.
2. Add/edit/delete and optional relationship/notes fields.
3. Upcoming list, today state, search, and category filter.
4. Acknowledgement/celebration note tied to an annual occurrence.
5. Reminder lead-time settings with accurate in-app-only explanation.
6. JSON export/import with validation and explicit user confirmation.
7. Responsive polish, accessibility, and final standalone packaging.

## Dependencies and risks
- Browser local storage can be cleared, unavailable, or constrained; JSON export/import and clear persistence messaging mitigate this.
- Static HTML cannot guarantee background notification delivery; product copy and tests must not imply that it does.
- Date-only values must avoid time-zone shifts; implementation should use calendar components and test year boundaries and leap-year transitions.
- Import data may be malformed or duplicate existing records; import should validate and make merge/replace behavior explicit.
- Accessibility and responsive behavior are cross-cutting and should be checked throughout design and validation.

## Release approach
Deliver as a local, standalone prototype. User data remains on-device. No service integrations, deployment, analytics, or external messaging are in this roadmap.
