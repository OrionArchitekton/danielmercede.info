/** @type {import('tailwindcss').Config} */
// Bundled Tailwind config — replaces the production Tailwind CDN JIT compiler (a
// ~123KB-gzip render-blocking script that recompiled CSS on every page load).
// This site carried no inline `tailwind.config`, so the theme is left at the
// Tailwind defaults; Vite now emits a compiled stylesheet at build time. The
// prerender (prerender.tsx → renderToStaticMarkup of the real App) is in the
// content globs so prerendered/pre-hydration classes are not purged.
export default {
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './constants.ts',
    './types.ts',
    './prerender.tsx',
    './prerender-context.ts',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
