import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/Business-Dk-GER/',
  server: {
    port: 3000,
    open: true,
    strictPort: false
  }
})
