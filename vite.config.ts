import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // относительные пути: сайт работает и в корне домена, и в подпапке GitHub Pages
  base: './',
  server: {
    // явный IPv4-адрес: некоторые браузеры на Windows не достучатся до localhost через IPv6
    host: '127.0.0.1',
    port: 5173,
    open: true,
  },
});
