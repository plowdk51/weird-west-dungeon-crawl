import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vitest/config';

// `base` is the GitHub Pages sub-path; overridable for other hosts.
const base = process.env.BASE_PATH ?? '/weird-west-dungeon-crawl/';
const THEME = '#1c120c';

export default defineConfig({
  base,
  plugins: [
    // Makes the game installable (web app manifest) and playable offline (service worker).
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Weird West Dungeon Crawl',
        short_name: 'Dungeon Crawl',
        description: 'A Weird West card crawl through a cursed silver mine.',
        start_url: base,
        scope: base,
        display: 'standalone',
        orientation: 'portrait',
        background_color: THEME,
        theme_color: THEME,
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // Precache the app and all card art so a run works with no connection.
        globPatterns: ['**/*.{js,css,html,svg,png,webp}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-css' },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-files',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  test: {
    include: ['tests/**/*.test.ts'],
  },
});
