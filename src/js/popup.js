import container from "./container.js";

document.addEventListener("DOMContentLoaded", async () => {
  const repo = await container.get("GptExt_Store_SettingsRepo$");
  const settings = (await repo.load()) || {};
  const menu = Array.isArray(settings.menu) ? settings.menu : [];

  const ul = document.getElementById("menu");
  menu.forEach((opt) => {
    const li = document.createElement("li");
    li.textContent = opt.name;
    li.addEventListener("click", () => {
      chrome.runtime.sendMessage({ action: "openDialog", payload: opt });
    });
    ul.appendChild(li);
  });
});
