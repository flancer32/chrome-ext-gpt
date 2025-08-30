import container from "../container.js";

document.addEventListener("DOMContentLoaded", async () => {
  const page = await container.get("GptExt_Ui_Toolbar_Action$");
  page.init();
});
