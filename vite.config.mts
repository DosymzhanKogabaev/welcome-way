import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const config = defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  assetsInclude: ["**/*.svg"],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  resolve: {
    alias: {
      "@/src": path.resolve(__dirname, "./src"),
      "@/worker": path.resolve(__dirname, "./worker"),
      "@/app": path.resolve(__dirname, "./src/app"),
      "@/assets": path.resolve(__dirname, "./src/assets"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/features": path.resolve(__dirname, "./src/features"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/pages": path.resolve(__dirname, "./src/pages"),
      "@/routes": path.resolve(__dirname, "./src/routes"),
      "@/themes": path.resolve(__dirname, "./src/themes"),
      "@/styles": path.resolve(__dirname, "./src/styles"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
      "@/services": path.resolve(__dirname, "./src/services"),
      "@/config": path.resolve(__dirname, "./src/config"),
      "@/types": path.resolve(__dirname, "./src/types"),
      "@/store": path.resolve(__dirname, "./src/store"),
      "@/layout": path.resolve(__dirname, "./src/layout"),
      "@/data": path.resolve(__dirname, "./src/data"),
      "@/helper": path.resolve(__dirname, "./src/helper"),
      "@/i18n": path.resolve(__dirname, "./src/i18n"),
      "@/shared": path.resolve(__dirname, "./shared"),
    },
  },
});

export default config;
