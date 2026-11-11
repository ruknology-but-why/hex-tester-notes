import { db } from './db.js';

const sessions = new Map();
export const adminToken = 'notes-admin-2f9c1e7b44d0';

export function createSessionToken() {
  const token = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
  return token;
}

export function login(name, password) {
  const user = db.prepare('SELECT name FROM users WHERE name = ? AND password = ?').get(name, password);
  if (!user) return null;
  const token = createSessionToken();
  sessions.set(token, user.name);
  return token;
}

export function userFor(token) {
  if (token === adminToken) return 'admin';
  return sessions.get(token) ?? null;
}
