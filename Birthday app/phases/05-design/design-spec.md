# Design Specification

## Information architecture
- **App header:** Birthday Reminder title; storage status; primary Add action.
- **Overview:** count/summary for today and upcoming; concise reminder and backup status.
- **Birthday list:** search, category filter, chronological cards/rows.
- **Record detail/editor:** date, optional age, relationship/category, notes/preferences, reminder lead times, celebration state/history.
- **Data controls:** export, import, and clear-all action with explicit confirmation.

## Key states
- Empty list with clear add action and short privacy/persistence explanation.
- Populated list with Today, This week, and Upcoming group cues while preserving chronological order.
- No search results with a one-click clear filter action.
- Storage available, storage unavailable, and unsaved changes states.
- Import validation, preview, conflict, success, and failure states.
- Delete confirmation and undo-friendly status where practical.

## Visual direction
Warm, calm, and personal without overly decorative birthday clichés. Use a light neutral canvas, a strong readable ink color, and one saturated accent for primary actions and today's highlight. Use clear type hierarchy, generous spacing, simple calendar/celebration motifs, and restrained rounded surfaces. Use color plus text/icon to communicate statuses. Avoid relying on color alone.

## Responsive behavior
- Desktop: centered content column with summary above a spacious list; detail can use a side panel.
- Small screens: single-column layout; filters and actions wrap; forms stack; dialogs fit within viewport and scroll internally.
- At 200% zoom and narrow widths, no essential action should require horizontal page scrolling.

## Interaction requirements
- All controls are native semantic elements where possible.
- Add/edit form supports Enter to submit when safe and Escape to close without losing unsaved form edits silently.
- Delete, clear-all, replace import, and other destructive actions require confirmation.
- Live feedback uses an accessible status region; focus moves predictably after dialogs close and after record deletion.
- Use explicit date labels and indicate observed February 28 for a February 29 birthday in a non-leap year.
- Explain in-app lead times beside settings; never label them as notifications that will fire while closed.
