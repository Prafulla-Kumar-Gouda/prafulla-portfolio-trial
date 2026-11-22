import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// One self-contained HTML file for hosted preview (fonts inlined; screenshots inlined by the script below).
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  define: { __BUILD_DATE__: JSON.stringify(new Date().toISOString()) },
  build: { outDir: 'dist-single', assetsInlineLimit: 100000000 },
})
