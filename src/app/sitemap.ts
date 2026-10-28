import type { MetadataRoute } from "next";
import { siteLastModified, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl, lastModified: new Date(siteLastModified), changeFrequency: "monthly", priority: 1 }];
}
