import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NIMA Studio — Nima Afsharfar",
    short_name: "NIMA Studio",
    description:
      "Full-stack product development, SaaS MVPs, automation workflows and data systems by Nima Afsharfar.",
    start_url: "/",
    display: "standalone",
    background_color: "#ECE4D2",
    theme_color: "#141210",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
