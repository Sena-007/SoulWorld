# Discovery + Recap MVP Spec

## Discovery Feed Rules
- Feed source: only entries with `isPrivate = false`.
- Anonymous labels: `Bir Okur`, `Bir Muziksever`, `Bir Gezgin`.
- Candidate scoring: based on shared DNA tags.
- Visibility threshold: include items with compatibility score >= 70.
- Action: `Koleksiyonuma Ekle` clones metadata into `plannedItems`.

## Planned Items
- Required fields: `id`, `userId`, `sourceEntryId`, `type`, `title`, `createdAt`.
- Planned lists are user-private.
- Items can be converted to full entries later (post-MVP).

## Weekly Recap
- Trigger: every Sunday 20:00 local region time.
- Inputs: all user entries from the current week.
- Outputs:
  - `entryCount`
  - `dominantType`
  - `generatedAt`
- Optional share action emits `weekly_recap_shared`.

## Failure Handling
- Discovery generation fails: return empty list with retry hint.
- Recap generation fails: write failure log and re-run once within 30 minutes.

