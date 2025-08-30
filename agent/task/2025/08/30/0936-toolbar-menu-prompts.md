# Task: Add toolbar menu and prompt manager page

## Summary
- Added static toolbar menu with links to options and prompt manager pages.
- Implemented new prompt manager page with IndexedDB storage for adding and deleting prompts.

## Observations
- Existing dynamic menu based on settings was replaced with static entries.
- Tests failed due to missing `@teqfw/di` dependency and `npm ci` could not download `openai` package (403 Forbidden).

## Suggestions
- Investigate dependency installation issue to enable automated tests.
