import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        // 前端开发端口（避免与 Vercel 本地函数端口 3000 冲突）
        port: 5173,
        host: '0.0.0.0',
        // 本地开发时，将 /api 转发到 Vercel 本地函数（默认 3000）
        proxy: {
          '/api': 'http://localhost:3000'
        }
      },
      plugins: [react()],
      // 安全调整：不再将 API 密钥注入前端 bundle
      // 生产环境改为通过后端路由调用（见 api/ask.ts）
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
