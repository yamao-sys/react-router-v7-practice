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
    },
  },
})
