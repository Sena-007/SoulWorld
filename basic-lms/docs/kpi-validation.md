# KPI Validation Protocol

## Test Dataset
- Create 10 test users.
- Complete onboarding for all users.
- Generate at least 30 entries over 7 days.
- Trigger at least 10 discovery saves and 10 recap shares.

## KPI Checks
- TTA: aggregate `first_entry_saved.timeToActionSeconds` median.
- D7: users active on day 7 / onboarded users.
- Weekly entries per user: total `entry_saved` / active users.
- Recap share rate: `weekly_recap_shared` / `weekly_recap_generated`.

## Acceptance Thresholds
- TTA median < 15 seconds.
- D7 retention >= 40%.
- Weekly entries per user >= 3.
- Recap share rate >= 10%.

