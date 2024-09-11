import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      protocol: 'ws',  // Ensure WebSocket is used
      host: 'localhost',  // Ensure the host is set correctly
      port: 5173,  // Port for WebSocket
    },
    port: 3000,  // Port for development server port for the React app
  }
})
