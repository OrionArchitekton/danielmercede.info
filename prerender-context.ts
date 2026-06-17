import React from 'react';

// Build-time prerender signal. The body-bake step (vite.config.ts) renders the
// App through this provider with `value={true}` so identity-only markup is
// serialized into the crawler-ingested dist/index.html. At runtime no provider
// is mounted (index.tsx), so the default `false` applies and the live hydrated
// app renders the full UI unchanged.
//
// Rationale: this surface is an identity-clarification page (see AGENTS.md /
// README "Purpose"); it "does not own promotional, marketing, or business
// content". The baked HTML that answer engines (ChatGPT / Perplexity / Claude)
// ingest must therefore exclude promotional CTAs while the human-facing runtime
// render is a separate brand decision and stays intact.
export const PrerenderContext = React.createContext<boolean>(false);
