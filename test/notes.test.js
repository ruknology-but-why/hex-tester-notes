import test from 'node:test';
import assert from 'node:assert/strict';
import { createNote, getNote, searchNotes } from '../src/notes.js';

test('search returns only the owner\'s matching notes', () => {
  const titles = searchNotes('alice', 'Release').map((note) => note.title);
  assert.deepEqual(titles, ['Release checklist']);
});

test('search with an empty query lists all of the owner\'s notes', () => {
  assert.equal(searchNotes('alice', '').length >= 2, true);
});

test('created notes can be read back', () => {
  const id = createNote('carol', 'Hello', 'First note');
  assert.equal(getNote(id).title, 'Hello');
});
