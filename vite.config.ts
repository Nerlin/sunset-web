import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      includeAssets: ["sun.png"],
      manifest: {
        name: "Sunset",
        short_name: "Sunset",
        description: "Check the sunset time",
        theme_color: "#db4d00",
        icons: [
          {
            src: "sun192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "sun.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
