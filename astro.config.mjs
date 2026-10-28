// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  // Fuentes descargadas al compilar y servidas desde el propio sitio: no bloquean el render como el CSS de Google Fonts
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Unbounded',
      cssVariable: '--font-unbounded',
      weights: [800],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Manrope',
      cssVariable: '--font-manrope',
      weights: ['400 700'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
  vite: {
    css: {
      preprocessorOptions: {
        // Bootstrap 5 aún usa @import y funciones globales de Sass: silencia esos avisos
        scss: { quietDeps: true, silenceDeprecations: ['import'] },
      },
    },
  },
});
