# SoulWorld MVP Backlog

## Scope Lock
- In scope: personal archiving for books, music, and places with low-friction entry.
- In scope: onboarding DNA quiz, personal grid, discovery feed, weekly recap.
- Out of scope: DM, comments, advanced social graph, full analytics dashboards for end users.

## Epics

### EPIC-01 Product Foundation
- Story: Define app modules and coding conventions.
- Story: Configure environments for `dev`, `staging`, and `prod`.
- Story: Create event taxonomy for KPI tracking.

### EPIC-02 Authentication and Onboarding
- Story: Email/password auth flow.
- Story: Google and Apple sign-in.
- Story: Zevk DNA 5-question onboarding and completion guard.

### EPIC-03 Magic Entry
- Story: Debounced search (`3 chars`, `300ms`) for all providers.
- Story: Save entries with optional note (`max 280`) and mood tags.
- Story: Handle loading, empty state, and provider fallback errors.

### EPIC-04 Visual Museum Grid
- Story: Render masonry-like feed with lazy loading behavior.
- Story: Add entry type badges and detail screen.
- Story: Support edit and soft delete.

### EPIC-05 Discovery and Planned Lists
- Story: Build DNA compatibility scoring.
- Story: Show anonymous source cards.
- Story: Copy cards into personal planned lists.

### EPIC-06 Weekly Recap
- Story: Generate recap payload every Sunday.
- Story: Produce share-ready recap card data.
- Story: Save recap history per user.

### EPIC-07 Quality and Release
- Story: Add unit tests for services and hooks.
- Story: Add integration checks for critical flows.
- Story: Create release checklist and KPI verification protocol.

## KPI Event Contract
- `onboarding_completed`
- `first_entry_saved`
- `entry_saved`
- `discovery_item_saved`
- `weekly_recap_generated`
- `weekly_recap_shared`

