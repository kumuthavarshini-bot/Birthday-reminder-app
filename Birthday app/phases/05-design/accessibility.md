# Accessibility Specification

Target WCAG 2.2 AA for the standalone web interface.

- Use landmarks, one clear page heading, logical heading levels, and semantic lists/forms/buttons.
- Give every input a persistent visible label; connect help and validation text programmatically.
- Maintain visible keyboard focus and logical tab order; do not trap focus outside modal dialogs.
- Ensure text and controls meet contrast requirements; use text/icons in addition to color for status.
- Support keyboard-only use for CRUD, search/filter, backup, restore, and confirmation flows.
- Announce save/import/delete results and storage failures through an appropriate live region.
- Respect reduced motion; avoid essential information conveyed by animation.
- Use sufficiently large targets and keep interactive elements separated on touch layouts.
- Test with browser zoom/reflow and at least one screen reader during Validation; report actual results in QA.
