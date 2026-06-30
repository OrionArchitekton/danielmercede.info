# Danielmercede.info Repo Contract

Date: 2026-06-30

Status: binding repo-local contract.

## Current Name

- `danielmercede.info`

## Recommended Name

- `danielmercede.info`

## Role

- `web`

## Purpose

`danielmercede.info` is a concise professional identity-clarification web
surface for Daniel "Dan" Mercede. It exists for name-equivalence and entity
resolution, not marketing or product promotion.

It is not the primary identity hub, not a duplicate personal-brand canon source,
and not a business, runtime, platform, or infra repo.

## Owns

- the static Vite/React identity-clarification page
- profile-card content and related-property links in repo-local source files
- self-canonical URL, sitemap, robots, favicons, and Vercel static routing
- WebPage and WebSite structured data that references the canonical Person entity
  on `danmercede.com`

## Does Not Own

- the canonical Person entity on `danmercede.com`
- other personal-brand domain surfaces
- promotional, marketing, business, or product content
- runtime services, backend APIs, shared infra, governance, or OAC business logic
- independent growth-surface status beyond identity clarification

## Allowed Dependencies

- static React, Vite, TypeScript, Tailwind CDN, and Vercel static hosting
- structured links to related personal-brand properties
- estate doctrine from `orion-estate-audit`
- the personal-brand family contract and canonical-home registry row

## Forbidden Logic / Forbidden Ownership

- emitting a competing local Person node when the hub owns the Person entity
- treating this surface as the primary identity site
- adding product, marketing, business, runtime, platform, or infra ownership
- inlining secret-bearing build environment values into the public bundle
- creating overlapping identity canon that conflicts with `danmercede.com`

## PR Reject Rules

- reject PRs that promote this repo into a primary or separate business surface
- reject PRs that duplicate or contradict the canonical hub identity
- reject PRs that add backend/runtime or secret-scope ownership
- reject PRs that weaken self-canonical, sitemap, robots, or structured-data
  behavior

## Verification

For docs-only contract changes:

```bash
git diff --check
```

For implementation changes, follow `AGENTS.md`; this repo declares `npm run
build`, `npm test`, `npm run dev`, and `npm run preview` but has no committed
lockfile or lint script.

## Basis

- `AGENTS.md`
- `README.md`
- `App.tsx`
- `constants.ts`
- `index.html`
- `vercel.json`
- `repos/repo_contract_registry_20260317.csv` in
  `OrionArchitekton/orion-estate-audit`
- `architecture/repo_contracts/dan_mercede_personal_brand_repo_contract_20260318.md`
  in `OrionArchitekton/orion-estate-audit`
