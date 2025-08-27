export default async function GptExt_Store_SettingsRepo() {
  return {
    async load() {
      return await new Promise((resolve) => {
        chrome.storage.local.get('settings', (result) => resolve(result.settings));
      });
    },
    async save(data) {
      return await new Promise((resolve) => {
        chrome.storage.local.set({ settings: data }, () => resolve());
      });
    },
  };
}
