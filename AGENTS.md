# AGENTS.md — danielmercede-info

## Repo Role

Minimal React 19 + Vite + TypeScript static site backing danielmercede.info —
a professional identity clarification surface for Daniel "Dan" Mercede
(name-equivalence / entity-resolution page). Content is intentionally concise
and non-marketing. Deployed via Vercel (`vercel.json`, SPA rewrite to
`index.html`).

## Repo Identity

- **Remote:** `OrionArchitekton/danielmercede.info` (GitHub)
- **Local home:** `personal-brand/dan-mercede/danielmercede-info/`
- **Registry row:** `personal-brand-dan-mercede-danielmercede-info`
  (`entity_kind: personal_authority`, `repo_role: web`, current-canon)
- **Deploy target:** Vercel

## Boundaries

Owns:

- the danielmercede.info identity-clarification web surface: SPA source,
  static assets under `public/`, Person structured data, sitemap/robots

Does not own:

- the other personal-brand domain surfaces (danmercede.com,
  danielmercede.com, danmercede.info, danmercede.online) — each domain repo
  serves a distinct role and self-canonicals
- promotional, marketing, or business content — this surface is identity
  clarification only (see README "Purpose")

## Start Here

- [README.md](README.md) — purpose, identity scope, related properties
- [App.tsx](App.tsx) — page composition
- [constants.ts](constants.ts) — site content
- [vercel.json](vercel.json) — rewrites and headers
- [package.json](package.json) — scripts (dev / build / preview)

## Validation

Verified in this change:

```bash
git diff --check
```

Declared by `package.json` — not verified in this change (no committed
lockfile, so dependencies were not installed):

```bash
npm run build    # vite build — the only declared verification step; no test or lint scripts exist
npm run dev      # vite dev server
npm run preview  # preview the production build
```

## Estate Authority

See `orion-estate-audit/AGENTS.md` for cross-repo doctrine. This repo is a
personal-brand surface under `personal-brand/dan-mercede/`; its canonical home
is tracked in `orion-estate-audit/estate_home_registry.yaml` (row
`personal-brand-dan-mercede-danielmercede-info`) and bound by the
`dan_mercede_personal_brand_repo_contract_20260318.md` repo contract.
