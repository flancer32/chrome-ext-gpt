# Task: Inline UI scripts

## Summary
- Integrated inline module scripts in HTML pages (`options`, `prompts`, and toolbar `action`) that import the DI container and attach handlers directly.
- Removed unused entry JavaScript files no longer referenced by the UI.

## Observations
- `npm ci` failed with 403 (forbidden) when fetching the `openai` package, leaving tests unresolved.
- `npm test` fails because `@teqfw/di` is missing from `node_modules`.
