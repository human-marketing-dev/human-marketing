import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

// TODO: sumar las entradas de /portafolio/[slug] y /servicios/[slug]
// cuando exista la fuente de contenido.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/servicios`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/portafolio`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/nosotros`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/blog`, changeFrequency: "weekly", priority: 0.6 },
    {
      url: `${site.url}/aviso-de-privacidad`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
