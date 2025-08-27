import initContainer from './container.js';

document.addEventListener('DOMContentLoaded', async () => {
  const di = await initContainer();
  const repo = await di.get('GptExt_Store_SettingsRepo');

  const settings = await repo.load();
  if (settings) {
    document.getElementById('baseUrl').value = settings.baseUrl || '';
    document.getElementById('model').value = settings.model || '';
    document.getElementById('apiKey').value = settings.apiKey || '';
  }

  document.getElementById('save').addEventListener('click', async () => {
    const newSettings = {
      baseUrl: document.getElementById('baseUrl').value.trim(),
      model: document.getElementById('model').value.trim(),
      apiKey: document.getElementById('apiKey').value.trim(),
    };
    await repo.save(newSettings);
    const status = document.getElementById('status');
    status.textContent = 'Settings saved.';
    setTimeout(() => (status.textContent = ''), 2000);
  });
});
