import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/bitrix/components/dresscode/search.line/ajax.php': {
        target: 'https://xn--b1aobdqivh2b8ap4c.xn--p1acf/',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
