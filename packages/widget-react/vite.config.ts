import { defineConfig } from "vite";
import { resolve, join } from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

import { peerDependencies } from "./package.json";

export default defineConfig({
  plugins: [react(), dts({ rollupTypes: true })],
  build: {
    target: "esnext",
    lib: {
      entry: resolve(__dirname, join("lib", "index.ts")),
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react/jsx-runtime", ...Object.keys(peerDependencies)],
    },
    emptyOutDir: false,
  },
});
