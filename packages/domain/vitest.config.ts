import { defineConfig } from "vitest/config";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    globals: true,
    root: "./",
    exclude: ["node_modules", "dist"],
  },
  plugins: [
    tsConfigPaths(),
  ]
}); 