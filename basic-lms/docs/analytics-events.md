# Analytics Event Dictionary

## Core Events
- `onboarding_completed`
  - Props: `dnaTagCount`, `durationSeconds`
- `first_entry_saved`
  - Props: `entryType`, `timeToActionSeconds`
- `entry_saved`
  - Props: `entryType`, `hasUserNote`, `tagCount`
- `discovery_item_saved`
  - Props: `entryType`, `compatibilityScore`
- `weekly_recap_generated`
  - Props: `entryCount`, `weekStartIso`, `weekEndIso`
- `weekly_recap_shared`
  - Props: `channel`, `entryCount`

## KPI Formulas
- TTA (`Time to Action`): first `first_entry_saved.timeToActionSeconds` median < 15s.
- D7 Retention: users active on day 7 / users that completed onboarding.
- Weekly Entry Target: average `entry_saved` per user per week >= 3.
- Weekly Share Rate: `weekly_recap_shared` / `weekly_recap_generated` >= 10%.

