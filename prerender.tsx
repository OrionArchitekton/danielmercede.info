import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import App from './App';

// Build-time, browserless body-bake entry. Rendered to a static HTML string by
// the `bodyBake` Vite plugin (see vite.config.ts) and injected into the served
// <div id="root"> so the deployed <body> carries real crawlable content (h1 +
// paragraphs) for answer engines that fetch raw HTML and do not execute JS
// (ChatGPT / Perplexity / Claude). No SSR runtime: the client still mounts via
// createRoot().render() and re-renders the identical tree on hydration.
export function renderBody(): string {
  return renderToStaticMarkup(React.createElement(App));
}
