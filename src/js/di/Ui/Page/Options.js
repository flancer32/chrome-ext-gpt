export default class GptExt_Ui_Page_Options {
  /** @param {{ GptExt_Store_SettingsRepo$: any, GptExt_Provider_TestOpenAI$: any }} deps */
  constructor({ GptExt_Store_SettingsRepo$, GptExt_Provider_TestOpenAI$ }) {
    const repo = GptExt_Store_SettingsRepo$;
    const tester = GptExt_Provider_TestOpenAI$;

    function showPopup(text) {
      const backdrop = document.createElement("div");
      backdrop.id = "popup-backdrop";
      const box = document.createElement("div");
      box.className = "popup";
      const title = document.createElement("h2");
      title.textContent = "OpenAI test";
      const body = document.createElement("pre");
      body.textContent = text;
      const close = document.createElement("button");
      close.textContent = "Close";
      close.addEventListener("click", () => backdrop.remove());
      box.append(title, body, close);
      backdrop.append(box);
      document.body.append(backdrop);
    }

    return {
      async init() {
        const baseEl = document.getElementById("baseUrl");
        const modelEl = document.getElementById("model");
        const keyEl = document.getElementById("apiKey");
        const testBtn = document.getElementById("btn-test-openai");
        const status = document.getElementById("status");

        const settings = await repo.load();
        if (settings) {
          baseEl.value = settings.baseUrl || "";
          modelEl.value = settings.model || "";
          keyEl.value = settings.apiKey || "";
        }

        const updateTestBtn = () => {
          testBtn.disabled = !(baseEl.value.trim() && modelEl.value.trim() && keyEl.value.trim());
        };
        updateTestBtn();

        [baseEl, modelEl, keyEl].forEach((el) => el.addEventListener("input", updateTestBtn));

        document.getElementById("save").addEventListener("click", async () => {
          const newSettings = {
            baseUrl: baseEl.value.trim(),
            model: modelEl.value.trim(),
            apiKey: keyEl.value.trim(),
          };
          await repo.save(newSettings);
          status.textContent = "Settings saved.";
          setTimeout(() => (status.textContent = ""), 2000);
          updateTestBtn();
        });

        testBtn.addEventListener("click", async () => {
          const text = await tester.run();
          showPopup(text);
        });
      },
    };
  }
}
