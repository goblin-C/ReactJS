import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'

export default defineConfig({
  define: {
    global: 'globalThis',
  },
  plugins: [
    react(),
    rollupNodePolyFill()
  ],
  resolve: {
    alias: {
      process: 'process/browser',
      buffer: 'buffer'
    }
  },
  optimizeDeps: {
    include: ['buffer', 'process']
  }
})
