# Spec — danielmercede.info body-bake + crawler-visible identity surface

**Repo:** OrionArchitekton/danielmercede.info (thin spoke)
**Feature:** Build-time body-bake (W1) + ProfilePage JSON-LD (W17) + theme-color/manifest alignment (W13) + a11y parity (W15)
**MAP:** `~/.orion/danmercede-brand-optimization-MAP-20260617.md` (rows W1, W13, W15, W17)
**Approved row set:** STEP-1 GATE (2026-06-17) — no-SSR build-time body-bake, keep 5 spokes hardened.

## Problem

The served `<body>` is an empty `<div id="root"></div>` (h1=0, p=0). Answer
engines that fetch raw HTML and do not execute JavaScript (ChatGPT / Perplexity /
Claude) see nothing — the entire bio/identity content is invisible to exactly
the surfaces this spoke targets. Only Google AI Overviews (headless-Chrome
Googlebot) renders the SPA, and that path is fragile/second-class.

## Constraints

- **No SSR runtime, no framework migration.** Body-bake is a build-time,
  browserless transform only. The committed bundle / Vercel build output stays
  deploy truth.
- **Single source of truth.** The same `App.tsx` that hydrates on the client is
  rendered at build time — baked markup must never drift from the live page.
- **Vercel builds on deploy** for this thin spoke (no committed `dist/`, `dist`
  is gitignored, no `VERCEL=1` skip-guard). A source change is sufficient to
  reach the live site after the next deploy.
- **Hub-spoke identity rule:** this spoke emits NO local `Person` node; the
  canonical Person entity is owned by `danmercede.com/#person`. JSON-LD only
  references it (`mainEntity` / `about` / `publisher`).
- **Thin-spoke rail:** no CI, no tests, no committed lockfile.

## Scenarios / Acceptance Criteria

1. **AC-W1-1 — Baked body on the deploy artifact.** After `npm run build`, the
   produced `dist/index.html` (the artifact Vercel serves) contains real
   crawlable content inside `<div id="root">`: at least one `<h1>` with the page
   subject's name and multiple `<p>` paragraphs of bio copy. Verified:
   `dist/index.html` has h1>=1 and p>=1 inside the root, with real text (not the
   empty shell).
2. **AC-W1-2 — Client still mounts.** `dist/index.html` retains exactly one
   `<div id="root">` and the `<script type="module">` entry, so the browser
   client mounts and renders the same tree (CSR for users, prerender for
   crawlers). No second root, no hydration-mismatch contract.
3. **AC-W1-3 — Bake is build-time + browserless.** The bake runs inside the Vite
   build via a plugin (`bodyBake` in `vite.config.ts`) using
   `react-dom/server` `renderToStaticMarkup`. No headless browser, no new SSR
   runtime dependency, no new framework.
4. **AC-W1-4 — Fail-loud.** The build fails if the prerender produces empty /
   h1-less markup, or if the `<div id="root"></div>` anchor is absent — so a
   future refactor cannot silently ship an empty body again.
5. **AC-W17-1 — ProfilePage type.** The head JSON-LD WebPage node is
   `@type: ["ProfilePage", "WebPage"]` and carries
   `mainEntity -> https://www.danmercede.com/#person`. No local Person node is
   added.
6. **AC-W13-1 — theme-color matches the served page.** `<meta theme-color>` and
   the manifest `theme_color`/`background_color` equal the served body
   background (`#f9fafb`), not a dark value that mismatches the light page. The
   manifest `name` ("Daniel Mercede") is correct for this Daniel/"Dan"
   equivalence page and stays.
7. **AC-W15-1 — a11y parity.** A keyboard-reachable "Skip to main content"
   link targets the `<main id="main-content" tabindex="-1">`, and a
   `prefers-reduced-motion: reduce` rule neutralizes transitions/animations —
   parity with the hub a11y pass (PR#17).

## Verification

- `npm install && npm run build` green.
- Count `<h1>`/`<p>` inside `dist/index.html` `#root` > 0 with real text.
- Confirm one `#root`, the module script, and head JSON-LD all present.
