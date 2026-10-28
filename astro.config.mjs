// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  vite: {
    css: {
      preprocessorOptions: {
        // Bootstrap 5 aún usa @import y funciones globales de Sass: silencia esos avisos
        scss: { quietDeps: true, silenceDeprecations: ['import'] },
      },
    },
  },
});
