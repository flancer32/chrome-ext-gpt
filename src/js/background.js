// Listen for messages from popup menu and open Assistant dialog
chrome.runtime.onMessage.addListener((message) => {
  if (message && message.action === "openDialog") {
    // AGENT: replace URL with Assistant page when implemented
    chrome.tabs.create({ url: chrome.runtime.getURL("src/html/options.html") });
  }
});
