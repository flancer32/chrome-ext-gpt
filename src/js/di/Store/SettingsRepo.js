export default class GptExt_Store_SettingsRepo {
  constructor() {
    return {
      async load() {
        return await new Promise((resolve) => {
          chrome.storage.local.get("settings", (result) => resolve(result.settings));
        });
      },
      async save(data) {
        return await new Promise((resolve) => {
          chrome.storage.local.set({ settings: data }, () => resolve());
        });
      },
    };
  }
}
