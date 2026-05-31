import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: ".",
  build: {
    outDir: "dist-game",
    rollupOptions: {
      input: "game.html",
    },
  },
  // 处理 Remotion 的 ESM/CJS 兼容
  optimizeDeps: {
    include: ["remotion", "@remotion/player"],
  },
  resolve: {
    alias: {},
  },
});
