import type { MetadataRoute } from "next";
import { site } from "@/content/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/products", "/products/opero", "/about", "/contact"].map(
    (path) => ({
      url: new URL(path, site.url).toString(),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : path === "/products/opero" ? 0.9 : 0.7,
    }),
  );
}
