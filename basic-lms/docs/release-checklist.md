# MVP Release Checklist

## Environment
- [ ] Firebase projects configured for `staging` and `prod`.
- [ ] Frontend `.env` values injected for release builds.
- [ ] API keys restricted by platform and usage.

## Security
- [ ] Firestore rules deployed and tested with emulator.
- [ ] Anonymous discovery output validated (no user identifiers).
- [ ] Account deletion path removes personal data.

## Reliability
- [ ] Cloud Functions deployed and scheduler enabled.
- [ ] Error logging and crash monitoring verified.
- [ ] API timeout/fallback behavior validated.

## Product KPI Readiness
- [ ] `onboarding_completed` event visible in analytics.
- [ ] `first_entry_saved` event includes TTA value.
- [ ] `weekly_recap_generated` and `weekly_recap_shared` events validated.

## Store Readiness
- [ ] App icon, splash, and metadata final.
- [ ] Privacy policy URL added.
- [ ] Internal testing build distributed and approved.

