import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Thera",
    short_name: "Thera",
    description: "Purpose-driven software for meaningful growth.",
    // Literal hex, not var(--color-primary): the Web App Manifest is
    // static JSON read by the OS/browser chrome outside any CSS context, so
    // it can't resolve a CSS custom property. Matches the primary token —
    // keep in sync if that token's value ever changes.
    theme_color: "#1e1e1e",
    background_color: "#1e1e1e",
    display: "standalone",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
