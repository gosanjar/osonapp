import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/shared/ui"),
      "@shared": path.resolve(__dirname, "./src/shared/components"),
      "@hooks": path.resolve(__dirname, "./src/shared/hooks"),
      "@utils": path.resolve(__dirname, "./src/shared/utils"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@lib": path.resolve(__dirname, "./src/lib"),
    },
  },
})
