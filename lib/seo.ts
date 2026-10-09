import type { Metadata } from "next";
import { site } from "@/content/site";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const url = new URL(path, site.url).toString();
  const image = new URL(
    `/api/og?page=${encodeURIComponent(path)}`,
    site.url,
  ).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: `${title} | Polysyne`,
      description,
      url,
      images: [
        { url: image, width: 1200, height: 630, alt: `${title} — Polysyne` },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Polysyne`,
      description,
      images: [image],
    },
  };
}
