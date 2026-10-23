# Birthday Reminder App AI Orchestration Workflow

## Purpose
Turn the approved business requirements in `input/birthday_reminder_app_brd.md` into a validated, standalone Birthday Reminder App deliverable through seven reviewable stages.

## Stage order
1. Product Definition
2. Roadmap
3. Research
4. Analysis
5. Design
6. Validation
7. Handover

Each stage writes its artifacts into the matching `phases/NN-stage-name/` directory and records its gate outcome in `gates/`. A stage may not be treated as approved until the user explicitly approves its gate. After presenting each gate, stop dependent work and wait for that approval.

## App implementation boundary
Do not implement app files in `src/` or `output/` until Product Definition, Roadmap, Research, Analysis, and Design have been approved. Validation must inspect the implemented app and its requirements. Handover prepares the final release package.

## Final deliverable
- `output/index.html`: self-contained, standalone app with inline CSS and JavaScript and no runtime network dependency.
- `output/README.md`: usage, features, supported behavior, and limitations.
- `output/QA_REPORT.md`: acceptance criteria and results from actual checks.

## Evidence and traceability
Carry source BRD requirement IDs into product, design, and QA artifacts where applicable. Clearly mark assumptions and unresolved questions. Never claim a test passed unless it was run against the final deliverable.
