import { Container } from '@teqfw/di';
import SettingsRepo from './di/Store/SettingsRepo.js';

export default async function initContainer() {
  const di = new Container();
  await di.register('GptExt_Store_SettingsRepo', [], SettingsRepo);
  return di;
}
