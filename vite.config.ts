import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv, type Plugin, createServer } from 'vite';
import react from '@vitejs/plugin-react';

// Build-time body-bake (W1): after the client bundle is written, render the
// React App to a static HTML string (browserless, no SSR runtime) and inject it
// into dist/index.html's <div id="root">. Answer engines that fetch raw HTML
// without executing JS (ChatGPT / Perplexity / Claude) then see a real body
// (h1 + paragraphs) instead of an empty root shell. The committed source is the
// single source of truth: the same App.tsx renders at build time and hydrates
// on the client, so the baked markup never drifts from the live page.
function bodyBake(): Plugin {
  return {
    name: 'body-bake',
    apply: 'build',
    async closeBundle() {
      const outFile = path.resolve(__dirname, 'dist/index.html');
      if (!fs.existsSync(outFile)) return;

      // Use a transient SSR-capable Vite server to load the TSX prerender entry
      // (handles JSX + import.meta.env), then dispose it immediately.
      const ssrServer = await createServer({
        configFile: false,
        appType: 'custom',
        logLevel: 'silent',
        server: { middlewareMode: true },
        resolve: { alias: { '@': path.resolve(__dirname, '.') } },
      });
      try {
        const mod = (await ssrServer.ssrLoadModule('/prerender.tsx')) as {
          renderBody: () => string;
        };
        const body = mod.renderBody();
        if (!body || !body.includes('<h1')) {
          throw new Error('body-bake produced empty or h1-less markup');
        }
        let html = fs.readFileSync(outFile, 'utf8');
        const emptyRoot = '<div id="root"></div>';
        if (!html.includes(emptyRoot)) {
          throw new Error('body-bake: <div id="root"></div> not found in dist/index.html');
        }
        html = html.replace(emptyRoot, `<div id="root">${body}</div>`);
        fs.writeFileSync(outFile, html);
      } finally {
        await ssrServer.close();
      }
    },
  };
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), bodyBake()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
