import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import dns from "dns";
import tailwindcss from "@tailwindcss/vite";

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: "localhost",
    port: 5173,
  },
});
