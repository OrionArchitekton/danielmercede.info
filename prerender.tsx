import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import App from './App';
import { PrerenderContext } from './prerender-context';

// Build-time, browserless body-bake entry. Rendered to a static HTML string by
// the `bodyBake` Vite plugin (see vite.config.ts) and injected into the served
// <div id="root"> so the deployed <body> carries real crawlable content (h1 +
// paragraphs) for answer engines that fetch raw HTML and do not execute JS
// (ChatGPT / Perplexity / Claude). No SSR runtime: the client still mounts via
// createRoot().render() and re-renders the identical tree on hydration.
//
// The App is rendered through PrerenderContext with value={true}: this excludes
// the promotional booking CTA from the crawler-ingested markup so the baked
// surface stays identity-clarification only (AGENTS.md: this surface "does not
// own promotional, marketing, or business content"). The runtime render mounts
// no provider, so humans still see the CTA — a separate brand decision left
// intact here.
export function renderBody(): string {
  return renderToStaticMarkup(
    React.createElement(PrerenderContext.Provider, { value: true }, React.createElement(App)),
  );
}
