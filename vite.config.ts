import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "/wedding/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true, // Игнорировать warnings из зависимостей
        silenceDeprecations: ["legacy-js-api", "import"], // Игнорировать конкретные предупреждения
      },
    },
  },
});