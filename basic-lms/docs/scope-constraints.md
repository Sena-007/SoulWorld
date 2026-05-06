# MVP Scope Constraints

## Must-Have Rules
- A user cannot access the main experience without completing DNA onboarding.
- Entry creation stays under 10-15 seconds for normal network conditions.
- Discovery does not expose real user names or profile handles.
- Every write operation must be scoped to the authenticated user id.

## Non-MVP Features (Explicitly Deferred)
- Direct messaging between users.
- User comments and public thread interactions.
- Advanced personal analytics charts.
- Physical print service.
- Offline-first sync (scheduled for post-MVP).

## Quality Gates
- All critical screens include loading and error states.
- Security rules reject cross-user data reads/writes.
- Soft delete is required for user-generated entries.
- KPI events are emitted for all funnel checkpoints.

