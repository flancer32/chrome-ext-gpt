import container from "./container.js";

document.addEventListener("DOMContentLoaded", async () => {
  const repo = await container.get("GptExt_Store_SettingsRepo$");
  const settings = (await repo.load()) || {};
  const menu = Array.isArray(settings.menu) ? settings.menu : [{name:'First',url:'https://chat.openai.com/'},{name:'Second',url:'https://chat.openai.com/'},{name:'Third',url:'https://chat.openai.com/'}];

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
