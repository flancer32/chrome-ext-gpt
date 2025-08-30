# Task: Update HTML files for extension CSP

## Summary
- Removed inline scripts from UI pages and linked external modules.
- Added explicit Content Security Policy meta tags.
- Implemented entry scripts to initialize pages via DI container.

## Observations
- `npm install` failed with 403 error, causing tests to fail due to missing dependencies.
