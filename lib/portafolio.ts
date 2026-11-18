import type { ServicioCta } from "@/lib/ctas";

export type Imagen = {
  src: string;
  width: number;
  height: number;
  /** Vacio = decorativa. TODO(alt): escribir alts reales con las fotos finales. */
  alt?: string;
};

/** Filtros del listado. Son etiquetas editoriales, no rutas de servicio. */
export const CATEGORIAS = {
  identidad: "Identidad",
  web: "Web y E-commerce",
  campanas: "Campañas",
  inmobiliario: "Inmobiliario",
} as const;

export type Categoria = keyof typeof CATEGORIAS;

export type Resultado = {
  /** Cifra corta: "+240%", "3x", "1,200". */
  valor: string;
  etiqueta: string;
};

export type Proyecto = {
  slug: string;
  nombre: string;
  /** Texto editorial libre para el eyebrow, NO una referencia a lib/servicios.ts. */
  servicio: string;
  categorias: Categoria[];
  /** Acento para el orbe de la pagina de detalle. */
  color: string;
  portada: Imagen;
  /** Imagenes extra del caso, en orden. La portada no se repite aqui. */
  galeria: Imagen[];
  /** Razon social o marca del cliente, si difiere del nombre del proyecto. */
  cliente?: string;
  industria?: string;
  anio?: string;
  /** Pastillas cortas bajo el resumen: "Branding", "Content"... */
  etiquetas?: string[];
  /** Lista completa del acordeon "Detalles del proyecto". */
  servicios?: string[];
  /** Servicio principal: decide el texto del formulario de cierre (lib/ctas.ts). */
  ctaServicio?: ServicioCta;
  /** Una o dos frases. Tambien se usa como meta description. */
  resumen?: string;
  reto?: string;
  solucion?: string;
  resultados?: Resultado[];
};

/**
 * Proporcion de las imagenes del portafolio. Al cambiar el set de fotos,
 * este es el unico valor que hay que tocar.
 */
export const PORTAFOLIO_ASPECT = "31 / 15"; // 2.07

const hm = (n: number): Imagen => ({
  src: `/hero/Human-Marketing-Agencia-de-Marketing-Digital-en-Monterrey-${n}.webp`,
  width: 1920,
  height: 929,
});

const scaled = (archivo: string): Imagen => ({
  src: `/hero/${archivo}-scaled.webp`,
  width: 2560,
  height: 1239,
});

/**
 * TODO(contenido): salvo Epicus, todo lo de aqui es PROVISIONAL. Nombres, servicios y
 * categorias se dedujeron de las imagenes del sitio anterior (public/hero/),
 * y ningun caso tiene aun resumen, reto, solucion ni resultados. Las paginas
 * de detalle muestran esas secciones solo cuando el campo existe.
 */
export const portafolio: Proyecto[] = [
  {
    slug: "mar-y-mar",
    ctaServicio: "branding",
    nombre: "Mar y Mar",
    servicio: "Diseño de Identidad + E-commerce",
    categorias: ["identidad", "web"],
    color: "#7fcf95",
    portada: hm(5),
    galeria: [hm(6), hm(8)],
  },
  {
    slug: "epicus",
    ctaServicio: "inmobiliario",
    nombre: "Epicus",
    servicio: "Marketing Inmobiliario",
    categorias: ["inmobiliario", "identidad", "web", "campanas"],
    color: "#1e3fd8",
    portada: scaled("Epicus_homepage"),
    galeria: [],
    // Contenido real, confirmado por Human (2026-11-18).
    cliente: "Epicus",
    industria: "Inmobiliario",
    resumen:
      "Proyecto de Marketing Inmobiliario para Epicus: Identidad visual, contenido, desarrollo web y campañas de captación de leads.",
    etiquetas: ["Branding", "Content", "Campañas de Leads", "Desarrollo web"],
    servicios: [
      "Branding",
      "Content Marketing",
      "Campañas de Leads",
      "Desarrollo Web",
    ],
  },
  {
    slug: "pagoel",
    ctaServicio: "branding",
    nombre: "Pagoel",
    servicio: "Diseño de Identidad",
    categorias: ["identidad"],
    color: "#a0673f",
    portada: scaled("Pagoel_portafolio_branding_1"),
    galeria: [],
  },
  {
    slug: "dulceleste",
    ctaServicio: "branding",
    nombre: "Dulceleste",
    servicio: "Diseño de Identidad + E-commerce",
    categorias: ["identidad", "web"],
    color: "#5fc6e6",
    portada: hm(27),
    galeria: [hm(29)],
  },
  {
    slug: "peach-and-posh",
    ctaServicio: "branding",
    nombre: "Peach & Posh",
    servicio: "Diseño de Identidad",
    categorias: ["identidad"],
    color: "#f07d3a",
    portada: hm(15),
    galeria: [],
  },
  {
    slug: "agora",
    ctaServicio: "inmobiliario",
    nombre: "Ágora",
    servicio: "Campañas Inmobiliarias",
    categorias: ["inmobiliario", "campanas"],
    color: "#c0121f",
    portada: scaled("Agora_homepage"),
    galeria: [],
  },
  {
    slug: "yomms",
    ctaServicio: "branding",
    nombre: "Yomms",
    servicio: "Diseño de Identidad + Empaque",
    categorias: ["identidad"],
    color: "#f2a03d",
    portada: hm(1),
    galeria: [hm(2)],
  },
  {
    slug: "santte",
    ctaServicio: "inmobiliario",
    nombre: "Santte",
    servicio: "Marketing Inmobiliario",
    categorias: ["inmobiliario", "campanas"],
    color: "#2f7fa8",
    portada: scaled("Santte_homepage"),
    galeria: [],
  },
  {
    slug: "no-traigo-lonche",
    ctaServicio: "branding",
    nombre: "No Traigo Lonche",
    servicio: "Diseño de Identidad + Sitio Web",
    categorias: ["identidad", "web"],
    color: "#d93a2b",
    portada: hm(19),
    galeria: [hm(21)],
  },
  {
    slug: "mte",
    ctaServicio: "web",
    nombre: "MTE Global Solutions",
    servicio: "Desarrollo Web",
    categorias: ["web"],
    color: "#1a3fbf",
    portada: scaled("MTE_homepage"),
    galeria: [],
  },
  {
    slug: "la-tinta",
    ctaServicio: "branding",
    nombre: "La Tinta",
    servicio: "Diseño de Identidad",
    categorias: ["identidad"],
    color: "#ff4fb8",
    portada: hm(24),
    galeria: [],
  },
  {
    slug: "wallworks",
    ctaServicio: "branding",
    nombre: "Wallworks",
    servicio: "Diseño de Identidad",
    categorias: ["identidad"],
    color: "#3fb8a8",
    portada: hm(11),
    galeria: [],
  },
  {
    slug: "sugarblood",
    ctaServicio: "branding",
    nombre: "Sugarblood",
    servicio: "Diseño de Identidad",
    categorias: ["identidad"],
    color: "#ff5a6e",
    portada: scaled("Diseno-de-identidad_1"),
    galeria: [],
  },
];

/** Los cinco del Home, en el orden del bento (3 chicas arriba, 2 grandes abajo). */
const SLUGS_HOME = ["mar-y-mar", "pagoel", "dulceleste", "peach-and-posh", "epicus"];

export const portafolioHome: Proyecto[] = SLUGS_HOME.map(
  (slug) => portafolio.find((p) => p.slug === slug)!,
);

export function rutaProyecto(p: Pick<Proyecto, "slug">) {
  return `/portafolio/${p.slug}`;
}

export function getProyecto(slug: string) {
  return portafolio.find((p) => p.slug === slug);
}

/** Los demas casos, empezando por el siguiente y dando la vuelta al final. */
export function otrosProyectos(slug: string) {
  const i = portafolio.findIndex((p) => p.slug === slug);
  return [...portafolio.slice(i + 1), ...portafolio.slice(0, i)];
}
