import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(path.join(root, 'index.html'), 'utf8');

test('Open Graph card references the committed local JPEG asset', () => {
  const image = html.match(/<meta property="og:image" content="https:\/\/www\.danielmercede\.info\/([^"]+)" \/>/);
  assert.ok(image, 'og:image must reference the danielmercede.info host');
  assert.equal(image[1], 'dan-mercede-og-card.jpg');

  const size = statSync(path.join(root, 'public', image[1])).size;
  assert.ok(size > 0, 'OG card must be non-empty');
  assert.ok(size <= 250 * 1024, `OG card must stay <= 250KB (got ${(size / 1024).toFixed(0)}KB)`);
});

test('Open Graph dimensions remain the standard large-preview card size', () => {
  assert.match(html, /<meta property="og:image:width" content="1200" \/>/);
  assert.match(html, /<meta property="og:image:height" content="630" \/>/);
});
