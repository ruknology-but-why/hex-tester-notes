import { readFile } from 'node:fs/promises';
import express from 'express';
import cors from 'cors';
import { login, userFor } from './auth.js';
import { exportNote } from './files.js';
import { createNote, getNote, renderTitle, searchNotes } from './notes.js';
import { updateSettings } from './settings.js';
import { summarize } from './assistant.js';

const app = express();
app.use(cors());
app.use(express.json());

function requireUser(req, res, next) {
  req.user = userFor(req.get('authorization')?.replace(/^Bearer /, ''));
  if (!req.user) return res.status(401).json({ error: 'Sign in first.' });
  next();
}

app.post('/login', (req, res) => {
  const token = login(req.body.name, req.body.password);
  if (!token) return res.status(401).json({ error: 'Invalid credentials.' });
  if (req.query.next) return res.redirect(req.query.next + '#token=' + token);
  res.json({ token });
});

app.patch('/settings', requireUser, (req, res) => res.json(updateSettings(req.user, req.body)));

// Unfurls links pasted into notes.
app.get('/link-preview', requireUser, async (req, res) => {
  const page = await fetch(req.query.url).then((response) => response.text());
  res.json({ title: page.match(/<title>([^<]*)<\/title>/i)?.[1] ?? req.query.url });
});

app.post('/notes/:id/summary', requireUser, async (req, res) => {
  const note = getNote(req.params.id);
  note ? res.json({ summary: await summarize(req, note) }) : res.status(404).end();
});

app.get('/notes', requireUser, (req, res) => res.json(searchNotes(req.user, req.query.q ?? '')));

app.post('/notes', requireUser, (req, res) => {
  res.status(201).json({ id: createNote(req.user, req.body.title, req.body.body) });
});

app.post('/notes/preview', requireUser, (req, res) => res.json({ title: renderTitle(req.body.title) }));

app.get('/notes/:id/export', requireUser, (req, res) => {
  const note = getNote(req.params.id);
  if (!note) return res.status(404).end();
  exportNote(req.params.id, (error) => error ? res.status(500).end() : res.json({ file: 'exports/note-' + req.params.id + '.tgz' }));
});

app.get('/attachments/:name', requireUser, async (req, res) => {
  try {
    res.send(await readFile('uploads/' + req.params.name));
  } catch {
    res.status(404).end();
  }
});

app.listen(process.env.PORT ?? 4000, () => console.log('notes-api listening'));
