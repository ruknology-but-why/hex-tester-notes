# notes-api

Small Express API for team notes: create, search and export notes, plus file attachments.

> **Test fixture.** This repo contains deliberately insecure code for exercising the Hex security reviewer. Do not deploy it.

```sh
npm install
npm start      # http://localhost:4000
npm test       # node:test, no install needed
```

| Method | Path | Description |
|---|---|---|
| POST | `/login` | Returns a session token |
| GET | `/notes?q=` | Search notes by title |
| POST | `/notes` | Create a note |
| GET | `/notes/:id/export` | Export a note as a gzip archive |
| GET | `/attachments/:name` | Download an attachment |
| POST | `/notes/preview` | Render a title template |
| PATCH | `/settings` | Update user settings |
| GET | `/link-preview?url=` | Unfurl a pasted link |
| POST | `/notes/:id/summary` | AI summary of a note |
