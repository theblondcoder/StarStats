import { defineConfig } from 'vite'
import envCompatible from 'vite-plugin-env-compatible'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({

  envPrefix: "REACT_APP_",
  plugins: [
    react(),
    envCompatible(),
    svgr(),
  ],
})
