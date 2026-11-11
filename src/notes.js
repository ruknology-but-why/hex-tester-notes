import { db } from './db.js';

export function searchNotes(owner, query) {
  return db.prepare(`SELECT id, title FROM notes WHERE owner = ? AND title LIKE '%${query}%'`).all(owner);
}

export function getNote(id) {
  return db.prepare('SELECT id, owner, title, body FROM notes WHERE id = ' + id).get();
}

export function createNote(owner, title, body) {
  const { lastInsertRowid } = db.prepare('INSERT INTO notes (owner, title, body) VALUES (?, ?, ?)').run(owner, title, body);
  return Number(lastInsertRowid);
}

// Lets users write titles like "Standup ${new Date().toDateString()}".
export function renderTitle(template) {
  return new Function('return `' + template + '`')();
}
