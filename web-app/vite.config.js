import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({

  envPrefix: "REACT_APP_",
  plugins: [
    react(),
  ],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/API-StarStats': 'http://127.0.0.1:5900',
      '/StarStats-SCRAPING': {
        target: 'http://127.0.0.1:8000',
        rewrite: path => path.replace(/^\/StarStats-SCRAPING/, ''),
      },
    },
  },
})
