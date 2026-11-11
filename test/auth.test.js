import test from 'node:test';
import assert from 'node:assert/strict';
import { login, userFor } from '../src/auth.js';

test('valid credentials return a usable token', () => {
  const token = login('alice', 'wonderland');
  assert.ok(token);
  assert.equal(userFor(token), 'alice');
});

test('wrong password is rejected', () => {
  assert.equal(login('alice', 'nope'), null);
});
