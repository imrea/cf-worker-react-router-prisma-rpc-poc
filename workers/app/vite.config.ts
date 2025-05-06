import { resolve } from 'node:path'
import { cloudflare } from '@cloudflare/vite-plugin'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  esbuild: {
    target: 'es2022',
  },
  plugins: [
    cloudflare({
      viteEnvironment: { name: 'ssr' },
      auxiliaryWorkers: [{ configPath: '../api/wrangler.jsonc' }],
      persistState: { path: resolve('../../.wrangler/state') },
    }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
})
