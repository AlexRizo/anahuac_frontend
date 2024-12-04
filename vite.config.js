import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Registra automáticamente el service worker y actualiza en segundo plano.
      manifest: {
        name: 'Examen de admisión Anáhuac',
        short_name: 'EXHA',
        description: 'Sistema de examen de admisión para el colegio Anáhuac',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/img/favicon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/img/favicon.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        // Opcional: personaliza el comportamiento del service worker
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
