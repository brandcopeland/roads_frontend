import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
import fs from 'fs';
import path from 'path';



// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  base: "/roads_frontend",
  server: {
    https:false,
    host: "0.0.0.0",
    port: 3005,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/"),
      },
    },
    
  },
});

// https:{
//   key: fs.readFileSync(path.resolve(__dirname, 'cert.key')),
//   cert: fs.readFileSync(path.resolve(__dirname, 'cert.crt')),
// },