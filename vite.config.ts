import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@features': path.resolve(__dirname, './src/features'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@mock': path.resolve(__dirname, './src/mock')
    }
  },
  server: {
    port: 3000,
    host: true,
    // Acessível de qualquer interface (necessário para TV webOS)
    strictPort: false
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    // Target ES2018 para compatibilidade com webOS 6+
    target: 'es2018',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['styled-components']
        }
      }
    },
    // Otimizações para webOS (memória limitada)
    terserOptions: {
      compress: {
        drop_console: true,  // Remove console.log em produção
        drop_debugger: true
      }
    }
  },
  css: {
    devSourcemap: true
  }
})