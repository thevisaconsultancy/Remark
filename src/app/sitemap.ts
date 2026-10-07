import type { MetadataRoute } from "next";
import { ROUTES, SITE } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({ url: `${SITE.url}${path === "/" ? "" : path}` }));
}
