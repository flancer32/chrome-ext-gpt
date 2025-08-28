# Flows

## Provider check
1. User fills settings on options page.
2. User presses **Test OpenAI**.
3. UI requests `GptExt_Provider_TestOpenAI` via DI container.
4. Service loads settings, calls OpenAI and maps errors.
5. Result text is shown in a popup; user closes it.
