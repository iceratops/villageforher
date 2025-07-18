/// <reference types="node" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          SNIPCART_API_KEY: process.env.VITE_SNIPCART_API_KEY,
          AIRTABLE_BASE_ID: process.env.VITE_AIRTABLE_BASE_ID,
          AIRTABLE_TABLE_NAME: process.env.VITE_AIRTABLE_TABLE_NAME,
          GOOGLE_CLIENT_ID: process.env.VITE_GOOGLE_CLIENT_ID,
        },
      },
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
