import { rm, cp } from 'node:fs/promises';

try {
  await rm('dist', { recursive: true, force: true });
  await cp('src', 'dist', { recursive: true });
} catch (err) {
  console.error('Build failed:', err);
  process.exit(1);
}
