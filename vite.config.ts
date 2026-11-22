import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Link previews (LinkedIn, WhatsApp, etc.) need absolute URLs. Once the site has a public address, set
// VITE_SITE_URL in .env (for example https://your-name.github.io/portfolio) and rebuild: the canonical link and the
// share image are then added automatically. Without it the page still works; only the preview image is skipped.
function siteMeta(siteUrl: string): Plugin {
  return {
    name: 'site-meta',
    transformIndexHtml(html) {
      const url = siteUrl.replace(/\/$/, '')
      if (!url) return html
      const tags = [
        `<link rel="canonical" href="${url}/" />`,
        `<meta property="og:url" content="${url}/" />`,
        `<meta property="og:image" content="${url}/og-image.png" />`,
        `<meta property="og:image:width" content="1200" />`,
        `<meta property="og:image:height" content="630" />`,
        `<meta name="twitter:image" content="${url}/og-image.png" />`,
      ].join('\n    ')
      return html.replace('</head>', `    ${tags}\n  </head>`)
    },
  }
}

// base './' lets the built site work on GitHub Pages project URLs, Netlify and Vercel.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    base: './',
    plugins: [react(), tailwindcss(), siteMeta(env.VITE_SITE_URL ?? '')],
    define: { __BUILD_DATE__: JSON.stringify(new Date().toISOString()) },
  }
})
