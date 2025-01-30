import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const silkwayProxyConfig = {
  target: 'https://xn--b1aobdqivh2b8ap4c.xn--p1acf/',
  changeOrigin: true,
  secure: false,
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // react()
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', { target: '18' }]],
      },
    }),
  ],
  server: {
    proxy: {
      '/bitrix/components/dresscode/sale.geo.positiion/ajax.php':
        silkwayProxyConfig,
      '/bitrix/components/dresscode/search.line/ajax.php': silkwayProxyConfig,
    },
  },
})
