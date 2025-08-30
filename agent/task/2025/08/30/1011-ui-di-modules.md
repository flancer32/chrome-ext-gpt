# Task: Extract UI logic into DI modules

## Summary
- Moved prompt management logic into `GptExt_Ui_Page_Prompts` DI module
- Encapsulated settings page behavior in `GptExt_Ui_Page_Options` and exposed an init method
- Created toolbar action module `GptExt_Ui_Toolbar_Action` to bind menu events

## Observations
- Inline scripts now only load the DI container and initialize the page module
- Tests still fail because required npm packages cannot be fetched

## Suggestions
- Provide access to `openai` and `@teqfw/di` packages so tests can run
