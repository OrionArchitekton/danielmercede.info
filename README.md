# Daniel Mercede — Professional Identity

A single-page professional identity site for **Daniel "Dan" Mercede**, built to give search engines, platforms, and professional references clear, present-day identity context.

**Live:** https://www.danielmercede.info/

The site renders one profile card: a portrait, a professional overview, core competencies, affiliations, and reference links. Its purpose is name equivalence between "Daniel Mercede" and "Dan Mercede" and accurate entity resolution across a set of separated personal domains. It is intentionally concise.

---

## Purpose

- Establish name equivalence between **Daniel Mercede** and **Dan Mercede**
- Serve as a neutral identity clarification surface
- Support accurate entity resolution across personal and professional domains
- Self-canonical: declares `https://www.danielmercede.info/` as the canonical URL and links related properties without duplicating their content

---

## Identity Scope

**Daniel "Dan" Mercede**
Runtime Governance Architect & Technology Executive
California, USA

Core competencies shown on the page (`constants.ts`):

- **Governed AI Systems** — compliant, controlled AI environments for enterprise deployment
- **AI Orchestration** — multi-agent workflows and automated decision pipelines
- **Enterprise Execution Infrastructure** — reliability engineering for high-stakes automated processes
- **Financial Systems Architecture** — automated trading and capital management platforms

Affiliations rendered on the page:

- **Orion Apex Capital** — Founder & Systems Architect
- **Orion Intelligence Agency** — Director, Applied AI & Orchestration
- **Cosmocrat** — Platform Architect

The page footer carries a single call to action — "Book a Runtime Governance Readiness Scan" — linking to `orionintelligenceagency.com/book`.

---

## Stack

- **Vite 6** (build + dev server)
- **React 19** + **react-dom 19**
- **TypeScript ~5.8**, **@vitejs/plugin-react**
- **Tailwind CSS** loaded via CDN (`cdn.tailwindcss.com`); no local Tailwind build step
- React/react-dom are bundled by Vite for production; the importmap in index.html is currently redundant as dependencies are not externalized in vite.config.ts
- **schema.org Person / WebPage / WebSite** JSON-LD, Open Graph + Twitter Card meta
- Hosted on **Vercel** (static hosting + SPA rewrites)

---

## Local development

Requires Node.js (Vite 6 / React 19) and npm.

```bash
git clone https://github.com/OrionArchitekton/danielmercede.info.git
cd danielmercede.info
npm install
npm run dev      # Vite dev server on http://0.0.0.0:3000
```

Build and preview the production bundle:

```bash
npm run build    # outputs to dist/
npm run preview  # serves the built dist/ locally
```

There is no `.env.example` and no required environment variables — the site is fully static and reads no runtime secrets. See the note under **Configuration** about a leftover scaffold define.

---

## Configuration

No environment variables are required to build or run the site.

`vite.config.ts` still contains a leftover define block from the original scaffold:

```ts
define: {
  'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
  'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
}
```

No source file references `API_KEY` or any Gemini/AI client, so this is dead config. It is safe to remove. **Do not set a `GEMINI_API_KEY` at build time** — if one were present it would be inlined into the public client bundle, since these defines are evaluated at build time.

---

## Deploy

Deployed on Vercel as a static build.

- **Build command:** `npm run build` → `dist/`
- **Routing:** `vercel.json` rewrites all paths to `/index.html` (SPA catch-all)
- **Headers:** `vercel.json` serves `/sitemap.xml` with `Content-Type: application/xml` and `Cache-Control: public, max-age=3600`

---

## SEO and structured data

This is the site's explicit purpose, so the SEO surface is part of the contract:

- `index.html` declares `<link rel="canonical">` to `https://www.danielmercede.info/`
- JSON-LD `@graph` with `WebPage` and `WebSite` nodes referencing the `#person` entity on `danmercede.com`
- Open Graph (`og:type=profile`) and Twitter `summary_large_image` cards; share image `dan-mercede-executive-authority.png`
- `public/robots.txt` (allows crawl, disallows admin/api/preview paths) and `public/sitemap.xml` (`lastmod 2026-01-26`)
- `site.webmanifest` PWA manifest with favicons in `public/`

---

## Project structure

| Path | Holds |
|------|-------|
| `index.html` | HTML shell: meta tags, JSON-LD, Tailwind CDN, React importmap |
| `index.tsx` | React entry point; mounts `<App />` into `#root` |
| `App.tsx` | The single profile card (header, overview, competencies, affiliations, links, CTA, footer) |
| `constants.ts` | `COMPETENCIES`, `ORGANIZATIONS`, `LINKS`, and image metadata |
| `components/SectionHeader.tsx` | Shared section heading |
| `types.ts` | TypeScript types for the data above |
| `vite.config.ts` | Vite config (dev server, plugins, defines, `@` alias) |
| `vercel.json` | SPA rewrites + sitemap headers |
| `public/` | Favicons, manifest, `robots.txt`, `sitemap.xml`, portrait assets |

---

## Related properties

This identity surface is one of a set of intentionally separated personal domains. The following are rendered as reference links on the page (`constants.ts`):

- **Professional Hub:** https://www.danmercede.com
- **Identity Summary:** https://www.danmercede.info
- **LinkedIn:** https://www.linkedin.com/in/danmercede

Each property serves a distinct role and self-canonicals independently.

---

## Status

Active and maintained. Updates are infrequent and intentional.

---

## License

No open-source license is granted. `package.json` is marked `"private": true`, and all site content and assets are proprietary.

© Daniel Mercede. All rights reserved. Not for reuse.
Jurisdiction: California, USA
