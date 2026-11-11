import test from 'node:test';
import assert from 'node:assert/strict';
import { updateSettings } from '../src/settings.js';

test('settings merge nested values', () => {
  const next = updateSettings('alice', { notifications: { digest: 'daily' } });
  assert.deepEqual(next.notifications, { email: true, digest: 'daily' });
});

test('settings keep defaults for untouched keys', () => {
  assert.equal(updateSettings('bob', { theme: 'dark' }).notifications.email, true);
});
