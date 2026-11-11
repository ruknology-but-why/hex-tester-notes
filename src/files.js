import { exec } from 'node:child_process';

export function exportNote(id, done) {
  exec('mkdir -p exports && tar -czf exports/note-' + id + '.tgz uploads', done);
}
