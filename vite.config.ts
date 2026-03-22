import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vite.dev/config/
// @fontsource CSS использует url(./files/*.woff2); Vite 8 не всегда копирует их в dist —
// без этого на проде 404 на /assets/files/*.woff2
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/@fontsource-variable/geist/files/*",
          dest: "assets/files",
        },
        {
          src: "node_modules/@fontsource/cormorant-garamond/files/*",
          dest: "assets/files",
        },
      ],
    }),
  ],
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