# Task: Add toolbar button with popup menu

## Summary
- Added action configuration with toolbar icon and popup in `manifest.json`.
- Implemented `popup.html` and `popup.js` to render a dynamic menu.
- Created `background.js` to handle `openDialog` messages and open a tab.
- Added placeholder `src/img/` directory for future icon files.

## Observations
- `SettingsRepo` currently returns a settings object; menu data should be stored under `settings.menu` to populate the popup.
- The background handler opens the options page as a stand-in for the Assistant UI.

## Suggestions
- Replace the options page URL with the real Assistant page once available.
- Extend settings storage to include menu definitions for popup entries.
