import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { sentryVitePlugin } from '@sentry/vite-plugin';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [
      react(),
      tailwindcss(),
      ...(env.VITE_SENTRY_AUTH_TOKEN
        ? [
            sentryVitePlugin({
              org: env.VITE_SENTRY_ORG || '',
              project: env.VITE_SENTRY_PROJECT || '',
              authToken: env.VITE_SENTRY_AUTH_TOKEN,
              sourcemaps: {
                assets: './dist/**/*.js',
                ignore: ['./dist/**/*.js.map'],
              },
            }),
          ]
        : []),
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      sourcemap: true,
    },
  };
});
