import { reactRouter } from "@react-router/dev/vite"
import autoprefixer from "autoprefixer"
import tailwindcss from "tailwindcss"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import path from "path"

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  plugins: [reactRouter(), tsconfigPaths()],
  server: {
    host: "0.0.0.0",
    port: Number(process.env.PORT),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      "@apollo/client/link/error": "@apollo/client/link/error/index.js",
      "@apollo/client/link/context": "@apollo/client/link/context/index.js",
      "@apollo/client": "@apollo/client/index.js",
    },
  },
})
