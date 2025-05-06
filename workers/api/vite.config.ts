import { resolve } from 'node:path'
import { cloudflare } from '@cloudflare/vite-plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    cloudflare({
      inspectorPort: false,
      persistState: { path: resolve(__dirname, '../../.wrangler/state') },
    }),
  ],
})
