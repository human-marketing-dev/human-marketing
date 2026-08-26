export type ServicioIcono = {
  src: string;
  width: number;
  height: number;
};

/**
 * Icono de marca, version blanca porque las cards son oscuras.
 * Hoy los cinco servicios comparten la mano: lo que los distingue es el color
 * del orbe. El campo `icono` sigue siendo por servicio para que volver a
 * iconos distintos sea un cambio de datos y no de componente.
 */
export const ICONO_MANO: ServicioIcono = {
  src: "/icon/human-marketing-hand-icon-white.webp",
  width: 719,
  height: 594,
};

export type Servicio = {
  titulo: string;
  descripcion: string;
  href: string;
  icono: ServicioIcono;
  /** Acento de la paleta Human. Mismo lenguaje que el GradientText de la seccion 2. */
  color: string;
};

/** Los href van relativos: los originales apuntaban al dominio anterior. */
export const servicios: Servicio[] = [
  {
    titulo: "Diseño de Identidad y Activos Comerciales",
    descripcion:
      "Desarrollamos identidad visual y materiales comerciales que impulsan ventas: logotipo, presentaciones, brochures y recursos listos para juntas, correos y WhatsApp. Cada pieza está diseñada para comunicar valor con claridad, diferenciar tu marca y darle a tu equipo comercial herramientas que sí cierran oportunidades.",
    href: "/servicios/diseno-de-identidad-y-activos-comerciales",
    icono: ICONO_MANO,
    color: "#1e28c8",
  },
  {
    titulo: "Desarrollo Web y Posicionamiento SEO",
    descripcion:
      "Construimos sitios web modernos, rápidos y responsivos, optimizados para SEO y conversión. Posicionan tu marca en búsquedas clave, aumentan el tráfico relevante y convierten visitas en oportunidades comerciales, convirtiéndose en el centro operativo de tu estrategia de prospección digital.",
    href: "/servicios/desarrollo-web-y-posicionamiento-seo",
    icono: ICONO_MANO,
    color: "#6e1eaa",
  },
  {
    titulo: "Marketing de Contenidos (Redes Sociales)",
    descripcion:
      "Producimos contenido visual y audiovisual que genera interacción, posicionamiento y oportunidades comerciales. Reels, publicaciones, videos y creativos desarrollados con estrategia para atraer atención, transmitir mensajes con fuerza, y nutrir tus campañas y redes con contenido que sí mueve a la acción.",
    href: "/servicios/marketing-de-contenidos",
    icono: ICONO_MANO,
    color: "#dc015b",
  },
  {
    titulo: "Campañas de Captación de Leads (SEM & Paid Media)",
    descripcion:
      "Ejecutamos campañas de Google Ads y Meta Ads con segmentación avanzada, anuncios de alto rendimiento y landing pages enfocadas en conversión. Optimizamos de forma continua para reducir costo por lead, aumentar calidad de prospectos y generar oportunidades reales para tu equipo comercial.",
    href: "/servicios/campanas-de-captacion-de-leads",
    icono: ICONO_MANO,
    color: "#fa505b",
  },
  {
    titulo: "Estrategia y Eficiencia Comercial",
    descripcion:
      "Optimizamos la forma en que tu empresa convierte prospectos en clientes. Analizamos datos del sitio y las campañas, revisamos el seguimiento de cada lead y colaboramos con tu equipo para fortalecer el proceso comercial. Más claridad, mejor toma de decisiones y un sistema que mejora con el tiempo.",
    href: "/servicios/estrategia-y-eficiencia-comercial",
    icono: ICONO_MANO,
    color: "#ffd93c",
  },
];
