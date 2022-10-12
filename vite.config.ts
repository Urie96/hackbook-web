import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import * as path from "path";

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  optimizeDeps: {
    exclude: ['@vant/touch-emulator'],
  },
  server: {
    port: 5173,
    proxy: {
      '/graphql': {
        target: 'https://book.lubui.com',
        secure: false,
      },
      '/api': {
        target: 'http://localhost:8080',
        rewrite: (path) => path.replace(/^\/api/, ''),
        ws: true,
        cookieDomainRewrite: '.lubui.com',
      },
      '/sso': {
        target: 'https://sso.lubui.com',
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sso/, ''),
      }
    },
  },
});
