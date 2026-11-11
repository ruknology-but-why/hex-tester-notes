import { DatabaseSync } from 'node:sqlite';

export const db = new DatabaseSync(process.env.NOTES_DB ?? ':memory:');

db.exec(`
  CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, owner TEXT NOT NULL, title TEXT NOT NULL, body TEXT NOT NULL);
  CREATE TABLE IF NOT EXISTS users (name TEXT PRIMARY KEY, password TEXT NOT NULL);
`);

if (!db.prepare('SELECT COUNT(*) AS n FROM notes').get().n) {
  const insert = db.prepare('INSERT INTO notes (owner, title, body) VALUES (?, ?, ?)');
  insert.run('alice', 'Sprint planning', 'Move the billing work to next sprint.');
  insert.run('alice', 'Release checklist', 'Tag, build, smoke test, announce.');
  insert.run('bob', 'Vendor contacts', 'Private: renewal is due in March.');
  db.prepare('INSERT INTO users VALUES (?, ?)').run('alice', 'wonderland');
  db.prepare('INSERT INTO users VALUES (?, ?)').run('bob', 'builder');
}
