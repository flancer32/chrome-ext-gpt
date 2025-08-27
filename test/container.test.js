import test from 'node:test';
import assert from 'node:assert/strict';
import initContainer from '../src/js/container.js';

test('SettingsRepo load and save through DI container', async () => {
  const storage = {};
  global.chrome = {
    storage: {
      local: {
        get: (key, cb) => cb({ [key]: storage[key] }),
        set: (obj, cb) => { Object.assign(storage, obj); cb(); }
      }
    }
  };

  const di = await initContainer();
  const repo = await di.get('GptExt_Store_SettingsRepo');

  await repo.save({ foo: 'bar' });
  const data = await repo.load();
  assert.deepEqual(data, { foo: 'bar' });
});
