import { defineConfig } from 'vite'

export default defineConfig(({ command }) => ({
  // 基础配置 - 开发环境用相对路径，生产环境用GitHub Pages路径
  base: command === 'serve' ? './' : '/cool-website-resume/',
  
  // 开发服务器配置
  server: {
    port: 3000,
    open: true,
    host: true
  },
  
  // 构建配置
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    }
  },
  
  // CSS 配置
  css: {
    devSourcemap: true
  },
  
  // 优化配置
  optimizeDeps: {
    include: ['locomotive-scroll']
  }
}))