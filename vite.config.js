import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// If you deploy this to GitHub Pages under a repo path (not a custom
// domain), uncomment and set `base` to "/your-repo-name/".
export default defineConfig({
  base: "/Pixel/",
  plugins: [react()],
});
