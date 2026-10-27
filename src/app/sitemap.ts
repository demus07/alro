import type { MetadataRoute } from "next";
import { projects, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/digital-experiences",
    "/intelligent-systems",
    "/company-intelligence",
    "/work",
    "/studio",
    "/contact",
    "/privacy",
  ];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}` })),
    ...projects.map((p) => ({ url: `${site.url}/work/${p.slug}` })),
  ];
}
