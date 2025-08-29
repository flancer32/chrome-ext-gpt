// Comments in code must be in English
export const deps = ["openai_index", "GptExt_Services_Storage$"]; // explicit deps
export default class GptExt_Provider_TestOpenAI {
  /** @param {{ openai_index: any, GptExt_Store_SettingsRepo$: any }} deps */
  constructor({ openai_index, GptExt_Store_SettingsRepo$ }) {
    // Use default export or namespace style
    const pkg = openai_index?.default ?? openai_index;
    this._OpenAI = pkg?.OpenAI;
    this._repo = GptExt_Store_SettingsRepo$;
  }

  async run() {
    // Load saved settings
    const { baseUrl, model, apiKey } = await this._repo.load();

    // Validate settings
    if (!baseUrl) throw new Error("Missing baseUrl");
    if (!model) throw new Error("Missing model");
    if (!apiKey) throw new Error("Missing apiKey");

    // Setup abort controller with 60s timeout
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 60_000);

    try {
      const client = new this._OpenAI({ apiKey, baseURL: baseUrl, dangerouslyAllowBrowser: true });
      const resp = await client.chat.completions.create(
        {
          model,
          messages: [{ role: "user", content: "How to use DI in browser extensions?" }],
          // temperature: 0.2,
        },
        { signal: controller.signal }
      );
      const text = resp?.choices?.[0]?.message?.content ?? "";
      return text.length > 8000 ? text.slice(0, 8000) : text;
    } catch (e) {
      const msg = String(e?.message || e || "");
      if (e?.status === 401 || e?.status === 403 || /401|403/.test(msg)) {
        return "Unauthorized / Forbidden. Check API key or org settings.";
      }
      if (e?.status === 429 || /429/.test(msg)) return "Rate limit.";
      if ((e?.status >= 500 && e?.status < 600) || /5\d\d/.test(msg)) {
        return "Upstream error.";
      }
      if (e?.name === "AbortError" || /aborted|timeout|network/i.test(msg)) {
        return "Network/timeout.";
      }
      return msg || "Unknown error";
    } finally {
      clearTimeout(timer);
    }
  }
}
