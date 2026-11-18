import type { MetadataRoute } from "next";

import { portafolio, rutaProyecto } from "@/lib/portafolio";
import { site } from "@/lib/site";

// TODO: sumar las entradas de /servicios/[slug] cuando exista su contenido.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/servicios`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/portafolio`, changeFrequency: "monthly", priority: 0.8 },
    ...portafolio.map((p) => ({
      url: `${site.url}${rutaProyecto(p)}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    { url: `${site.url}/nosotros`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/blog`, changeFrequency: "weekly", priority: 0.6 },
    {
      url: `${site.url}/aviso-de-privacidad`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
