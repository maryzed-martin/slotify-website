import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" keeps asset paths relative, so the build also runs from a subfolder or a file host.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
