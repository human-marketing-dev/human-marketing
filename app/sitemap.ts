import type { MetadataRoute } from "next";

import { portafolio, rutaProyecto } from "@/lib/portafolio";
import { servicios } from "@/lib/servicios";
import { serviciosDetalle } from "@/lib/servicios-detalle";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/servicios`, changeFrequency: "monthly", priority: 0.8 },
    // Solo los servicios con copy: los provisionales van con noindex.
    ...servicios
      .filter((s) => serviciosDetalle.some((d) => s.href.endsWith(`/${d.slug}`)))
      .map((s) => ({
        url: `${site.url}${s.href}`,
        changeFrequency: "monthly" as const,
        priority: 0.9,
      })),
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
