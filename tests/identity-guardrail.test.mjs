// Round-2 R12 / O7 — SPOKE-SIDE identity guardrail.
//
// The hub-spoke identity rule (settled doctrine, AEO round-2 MAP): every spoke
// must reference the hub Person via "@id": "https://www.danmercede.com/#person"
// and must NOT declare its own local Person node (a "@type": "Person" object
// anchored to this spoke's own domain). This rule was previously enforced
// HUB-side only; this test adds the SPOKE-side guard so a future regression — a
// competing Person node minted on this spoke — fails CI.
//
// Deterministic and self-contained: reads the committed JSON-LD source(s) off
// disk, no network. On danielmercede.info the single JSON-LD source is the
// static <script type="application/ld+json"> in index.html <head>; the body-bake
// step only injects <h1>/<p> markup into <div id="root"> (App.tsx emits no
// JSON-LD), so index.html is the sole structured-data surface.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');

const HUB_PERSON_ID = 'https://www.danmercede.com/#person';
// This spoke's own domain. A Person node @id-anchored here is the violation.
const SPOKE_DOMAIN = 'danielmercede.info';

// --- Extract every JSON-LD block from an HTML string. -----------------------
function extractJsonLdBlocks(html) {
  const blocks = [];
  const re =
    /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const raw = m[1].trim();
    if (raw) blocks.push(raw);
  }
  return blocks;
}

// Flatten a parsed JSON-LD document (object, @graph array, or bare array) into
// the list of concrete node objects it declares.
function collectNodes(parsed) {
  const nodes = [];
  const visit = (value) => {
    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }
    if (value && typeof value === 'object') {
      // Treat any object as a candidate node; also descend into @graph and any
      // nested objects/arrays so wrapped graphs are not missed.
      nodes.push(value);
      if (Array.isArray(value['@graph'])) value['@graph'].forEach(visit);
      for (const [k, v] of Object.entries(value)) {
        if (k === '@graph') continue;
        if (v && typeof v === 'object') visit(v);
      }
    }
  };
  visit(parsed);
  return nodes;
}

function typeList(node) {
  const t = node['@type'];
  if (t == null) return [];
  return Array.isArray(t) ? t.map(String) : [String(t)];
}

function isPersonTyped(node) {
  return typeList(node).includes('Person');
}

// A node is a "bare reference" to the hub Person when it carries an @id pointing
// at the hub #person and declares no @type of its own (e.g.
// { "@id": "https://www.danmercede.com/#person" } used inside mainEntity/about/
// publisher). Bare references are ALLOWED — they are the required backlink.
function isBareHubReference(node) {
  if (isPersonTyped(node)) return false;
  const id = typeof node['@id'] === 'string' ? node['@id'] : '';
  return id === HUB_PERSON_ID || id === HUB_PERSON_ID.replace('www.', '');
}

// A LOCAL Person node (the violation) is a Person-typed object that is NOT a
// reference to the hub. Two ways it manifests:
//   1. @type Person anchored to THIS spoke's own domain via @id, or
//   2. @type Person that defines person properties locally (name/url/sameAs/...)
//      instead of being the hub's own node.
// A Person-typed node whose @id is exactly the hub #person id is the hub node
// itself (only valid if the hub were re-declaring it — not expected on a spoke,
// but not a spoke-minted local node either), so it is excluded from the count.
function isLocalPersonNode(node) {
  if (!isPersonTyped(node)) return false;
  const id = typeof node['@id'] === 'string' ? node['@id'] : '';
  const isHubNode = id === HUB_PERSON_ID || id === HUB_PERSON_ID.replace('www.', '');
  if (isHubNode) return false;
  return true;
}

function findLocalPersonNodes(parsed) {
  return collectNodes(parsed).filter(isLocalPersonNode);
}

function documentReferencesHubPerson(jsonText) {
  // Reference can appear as a bare @id object anywhere in the graph; a raw
  // substring check is the most regression-resistant signal that the backlink
  // survives, complementing the structural node walk below.
  return jsonText.includes(HUB_PERSON_ID);
}

// --- Load the committed JSON-LD source(s). ----------------------------------
const indexHtml = readFileSync(resolve(REPO_ROOT, 'index.html'), 'utf8');
const ldBlocks = extractJsonLdBlocks(indexHtml);

test('index.html carries at least one JSON-LD block', () => {
  assert.ok(
    ldBlocks.length >= 1,
    'expected at least one <script type="application/ld+json"> in index.html',
  );
});

test('every JSON-LD block is valid JSON', () => {
  for (const block of ldBlocks) {
    assert.doesNotThrow(
      () => JSON.parse(block),
      `JSON-LD block is not valid JSON:\n${block}`,
    );
  }
});

test('spoke references the hub Person (#person backlink present)', () => {
  const referenced = ldBlocks.some(documentReferencesHubPerson);
  assert.ok(
    referenced,
    `expected a backlink to the hub Person "${HUB_PERSON_ID}" in index.html JSON-LD; ` +
      'a spoke must point its identity at the hub, not mint its own.',
  );
});

test('spoke declares NO local Person node (hub-spoke identity rule)', () => {
  const offenders = [];
  for (const block of ldBlocks) {
    const parsed = JSON.parse(block);
    offenders.push(...findLocalPersonNodes(parsed));
  }
  assert.equal(
    offenders.length,
    0,
    `found ${offenders.length} local Person node(s) on this spoke — a spoke must ` +
      `reference the hub Person ("${HUB_PERSON_ID}"), not declare its own. ` +
      `Offending node(s): ${JSON.stringify(offenders)}`,
  );
});

// --- Negative self-check: prove the detector actually fires. ----------------
// If a competing local Person node were introduced (the exact regression this
// guard exists to catch), findLocalPersonNodes MUST flag it. This runs against
// synthetic fixtures only — it never touches the committed index.html — so the
// guard cannot silently degrade into a no-op that always passes.
test('detector catches a synthetic local Person node (negative control)', () => {
  const withLocalPerson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['ProfilePage', 'WebPage'],
        '@id': `https://www.${SPOKE_DOMAIN}/#webpage`,
        mainEntity: { '@id': HUB_PERSON_ID },
      },
      {
        // The violation: a Person node minted on THIS spoke's domain.
        '@type': 'Person',
        '@id': `https://www.${SPOKE_DOMAIN}/#person`,
        name: 'Daniel Mercede',
        url: `https://www.${SPOKE_DOMAIN}/`,
      },
    ],
  };
  const offenders = findLocalPersonNodes(withLocalPerson);
  assert.equal(
    offenders.length,
    1,
    'detector failed to flag a synthetic spoke-local Person node — the guard is inert',
  );

  // A Person declared via an @type ARRAY must also trip the detector.
  const arrayTypePerson = {
    '@type': ['Person', 'ProfilePage'],
    '@id': `https://www.${SPOKE_DOMAIN}/#person`,
    name: 'Daniel Mercede',
  };
  assert.equal(
    findLocalPersonNodes(arrayTypePerson).length,
    1,
    'detector failed to flag a Person declared via @type array',
  );

  // A bare hub reference (no @type) must NOT be flagged — it is the required
  // backlink, not a local node.
  const bareRef = { '@id': HUB_PERSON_ID };
  assert.equal(
    findLocalPersonNodes(bareRef).length,
    0,
    'detector wrongly flagged a bare hub #person reference as a local Person node',
  );
  assert.ok(
    isBareHubReference(bareRef),
    'bare hub reference should be recognized as the allowed backlink form',
  );
});
