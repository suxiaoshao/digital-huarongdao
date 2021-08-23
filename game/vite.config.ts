import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import ViteRsw from 'vite-plugin-rsw';

// https://vitejs.dev/config/
export default defineConfig((config) => {
  return {
    plugins: config.mode === 'development' ? [reactRefresh(), ViteRsw({ crates: ['wasm'] })] : [reactRefresh()],
    server: {
      port: 3001,
    },
  };
});
