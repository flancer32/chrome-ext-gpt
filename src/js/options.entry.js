import container from "./container.js";

document.addEventListener("DOMContentLoaded", async () => {
  const repo = await container.get("GptExt_Store_SettingsRepo$");

  debugger;

  const settings = await repo.load();
  if (settings) {
    document.getElementById("baseUrl").value = settings.baseUrl || "";
    document.getElementById("model").value = settings.model || "";
    document.getElementById("apiKey").value = settings.apiKey || "";
  }

  document.getElementById("save").addEventListener("click", async () => {
    const newSettings = {
      baseUrl: document.getElementById("baseUrl").value.trim(),
      model: document.getElementById("model").value.trim(),
      apiKey: document.getElementById("apiKey").value.trim(),
    };
    await repo.save(newSettings);
    const status = document.getElementById("status");
    status.textContent = "Settings saved.";
    setTimeout(() => (status.textContent = ""), 2000);
  });
});
