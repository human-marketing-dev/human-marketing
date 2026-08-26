export type Proyecto = {
  nombre: string;
  /** Texto editorial libre, NO una referencia a lib/servicios.ts. */
  servicio: string;
  src: string;
  width: number;
  height: number;
  href: string;
};

/**
 * Proporcion de las imagenes del portafolio. Al cambiar el set de fotos,
 * este es el unico valor que hay que tocar.
 */
export const PORTAFOLIO_ASPECT = "31 / 15"; // 2.07

/**
 * Las cinco fotos son PROVISIONALES y apuntan a public/hero/ a proposito:
 * los mismos archivos que usa el slider, sin copias que despues haya que
 * sincronizar. Cuando lleguen las definitivas se cambian aqui.
 */
export const portafolio: Proyecto[] = [
  {
    nombre: "Mar y Mar",
    servicio: "Diseño de Identidad + E-commerce",
    src: "/hero/Human-Marketing-Agencia-de-Marketing-Digital-en-Monterrey-5.webp",
    width: 1920,
    height: 929,
    href: "/portafolio/branding-mar-y-mar",
  },
  // TODO(ruta): falta la pagina de detalle de este proyecto.
  {
    nombre: "Pagoel",
    servicio: "Diseño de Identidad",
    src: "/hero/Pagoel_portafolio_branding_1-scaled.webp",
    width: 2560,
    height: 1239,
    href: "#",
  },
  // TODO(ruta): falta la pagina de detalle de este proyecto.
  {
    nombre: "Dulceleste",
    servicio: "Diseño de Identidad",
    src: "/hero/Human-Marketing-Agencia-de-Marketing-Digital-en-Monterrey-27.webp",
    width: 1920,
    height: 929,
    href: "#",
  },
  // TODO(ruta): falta la pagina de detalle de este proyecto.
  {
    nombre: "Peach & Posh",
    servicio: "Diseño de Identidad",
    src: "/hero/Human-Marketing-Agencia-de-Marketing-Digital-en-Monterrey-15.webp",
    width: 1920,
    height: 929,
    href: "#",
  },
  // TODO(ruta): falta la pagina de detalle de este proyecto.
  {
    nombre: "Epicus",
    servicio: "Marketing Inmobiliario",
    src: "/hero/Epicus_homepage-scaled.webp",
    width: 2560,
    height: 1239,
    href: "#",
  },
];
