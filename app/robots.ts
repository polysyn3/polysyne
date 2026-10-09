import type { MetadataRoute } from "next";
import { site } from "@/content/site";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(process.env.NEXT_PUBLIC_SITE_URL
        ? { allow: "/", disallow: "/api/" }
        : { disallow: "/" }),
    },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
