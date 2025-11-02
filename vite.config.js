import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  
  // Asegurar que las variables de entorno se carguen correctamente
  envPrefix: 'VITE_',
  
  build: {
    // Generar sourcemaps para debugging en producción
    sourcemap: false,
    
    // Optimizaciones
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          emailjs: ['@emailjs/browser']
        }
      }
    }
  }
});
