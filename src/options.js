// Load saved settings on page load
document.addEventListener("DOMContentLoaded", async () => {
  const { settings } = await chrome.storage.local.get("settings");
  if (settings) {
    document.getElementById("baseUrl").value = settings.baseUrl || "";
    document.getElementById("model").value = settings.model || "";
    document.getElementById("apiKey").value = settings.apiKey || "";
  }
});

// Save settings
document.getElementById("save").addEventListener("click", async () => {
  const settings = {
    baseUrl: document.getElementById("baseUrl").value.trim(),
    model: document.getElementById("model").value.trim(),
    apiKey: document.getElementById("apiKey").value.trim(),
  };
  await chrome.storage.local.set({ settings });
  const status = document.getElementById("status");
  status.textContent = "Settings saved.";
  setTimeout(() => (status.textContent = ""), 2000);
});
