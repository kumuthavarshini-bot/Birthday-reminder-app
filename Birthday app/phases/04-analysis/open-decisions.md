# Analysis Decisions for Gate 5

## Proposed resolutions
- **Age semantics:** Show current age as of today when a birth year is supplied; never show an inferred age. This is predictable and avoids implying the person has already reached their next age.
- **Relationship categories:** Include a modest editable default list (Family, Friend, Colleague, Other), with custom text/category support if implementation complexity permits.
- **Import behavior:** Require an explicit merge or replace choice after preview. Do not silently overwrite or deduplicate. Merge flags potential duplicates and lets the user decide.
- **Storage failure:** Keep the active session usable, but show a persistent unsaved-data state and make JSON export immediately available.

## Deferred questions
No user research validates default categories or backup expectations. Keep choices reversible and avoid blocking basic birthday entry on optional metadata.
