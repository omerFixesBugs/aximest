import type { MetadataRoute } from "next";
import { cardGrids, services, serviceDetail, site } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    priority,
  });

  return [
    page("", 1),
    page("/contact", 0.9),
    page("/projects", 0.8),
    page("/expertise", 0.7),
    page("/about", 0.7),
    page("/articles", 0.6),
    page("/podcasts", 0.5),
    ...services.flatMap((s) => [
      page(s.slug, 0.8),
      ...serviceDetail[s.id].items.map((item) => page(`${s.slug}/${item.slug}`, 0.6)),
    ]),
    ...cardGrids.flatMap((g) => g.items.map((item) => page(`${g.base}/${item.slug}`, 0.6))),
    page("/terms", 0.2),
    page("/privacy", 0.2),
  ];
}
