export default class GptExt_Ui_Toolbar_Action {
  constructor() {
    return {
      init() {
        const optionsBtn = document.getElementById("open-options");
        const promptsBtn = document.getElementById("open-prompts");

        optionsBtn.addEventListener("click", () => {
          chrome.runtime.openOptionsPage();
        });

        promptsBtn.addEventListener("click", () => {
          const url = chrome.runtime.getURL("src/html/prompts.html");
          chrome.tabs.create({ url });
        });
      },
    };
  }
}
