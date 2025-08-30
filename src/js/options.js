import container from "./container.js";

document.addEventListener("DOMContentLoaded", async () => {
  const page = await container.get("GptExt_Ui_Page_Options$");
  await page.init();
});
