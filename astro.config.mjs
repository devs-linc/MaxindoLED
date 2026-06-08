// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import keystatic from '@keystatic/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://maxindoled.com',
  output: 'static',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    preact(),
    keystatic(),
    sitemap({
      i18n: {
        defaultLocale: 'id',
        locales: {
          id: 'id-ID',
          en: 'en-US',
        },
      },
    }),
  ],
});
