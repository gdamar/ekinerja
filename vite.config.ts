import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    
    plugins: [
      VitePWA({
    // includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
    devOptions:{
      enabled: true,
      type: 'module'
    },
    manifest: {
      name: 'Ekinerja',
      start_url: '/about',
      display: 'standalone',
      orientation: "portrait", 
      short_name: 'ekinerja',
      description: 'Aplikasi laporan kinerja PPSU Kelurahan Cipinang',
      theme_color: '#242424',
      screenshots: [
        {
          src: "Screenshot_20260214-234608_Chrome.png", 
          sizes:"720x1600", 
          form_factor: "narrow",
          label:"Home page",
        }
      ],
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: "maskable"
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose:"any"
        }
        
      ]
    }
  }),
      tsconfigPaths(),
      react(),
      checker({
        typescript: true,
        eslint: {
          useFlatConfig: true,
          lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
        },
        overlay: {
          initialIsOpen: false,
        },
      }),
    ],
    preview: {
      port: Number(process.env.VITE_APP_PORT || 5005),
    },
    server: {
      host: '0.0.0.0',
      allowedHosts: ["dev.marcotox.me"],
      port: Number(process.env.VITE_APP_PORT || 5005),
    },
    base: process.env.NODE_ENV === 'production' ? process.env.VITE_BASENAME : '/',
  });
};
