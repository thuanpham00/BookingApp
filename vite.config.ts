import react from "@vitejs/plugin-react"
import path from "path"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5400 // có thể thay port khác
  },
  // test: {
  //   environment: "jsdom", // or 'jsdom', 'node' // thay dổi môi trường để test
  //   setupFiles: path.resolve(__dirname, "./vitest.setup.js") // dùng để test mock API
  // },
  css: {
    devSourcemap: true // thể hiện đường dẫn src map css
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src")
    }
  }
})
