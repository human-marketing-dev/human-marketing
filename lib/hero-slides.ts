export type HeroSlide = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

// Proporcion de las imagenes del hero. Al cambiar el set de fotos,
// este es el unico valor que hay que tocar.
export const HERO_ASPECT = "31 / 15"; // 2.07 - capturas panoramicas

/**
 * Imagenes provisionales del sitio anterior. Los `alt` estan derivados del
 * nombre de archivo y hay que reescribirlos cuando lleguen las fotos finales.
 *
 * Excluida a proposito: Disenodeidentidad_activoscomerciales_2-scaled.webp
 * (2048x2560, ratio 0.80). Sigue en public/hero/ pero no entra al slider
 * porque rompe la constante de proporcion.
 */
export const heroSlides: HeroSlide[] = [
  // TODO(alt): provisional, derivado del nombre de archivo.
  {
    src: "/hero/Agora_homepage-scaled.webp",
    alt: "Sitio web de Ágora",
    width: 2560,
    height: 1239,
  },
  // TODO(alt): provisional, derivado del nombre de archivo.
  {
    src: "/hero/Santte_homepage-scaled.webp",
    alt: "Sitio web de Santte",
    width: 2560,
    height: 1239,
  },
  // TODO(alt): provisional, derivado del nombre de archivo.
  {
    src: "/hero/MTE_homepage-scaled.webp",
    alt: "Sitio web de MTE",
    width: 2560,
    height: 1239,
  },
  // TODO(alt): provisional, derivado del nombre de archivo.
  {
    src: "/hero/Epicus_homepage-scaled.webp",
    alt: "Sitio web de Epicus",
    width: 2560,
    height: 1239,
  },
  // TODO(alt): provisional, derivado del nombre de archivo.
  {
    src: "/hero/Pagoel_portafolio_branding_1-scaled.webp",
    alt: "Branding de Pagoel",
    width: 2560,
    height: 1239,
  },
  // TODO(alt): provisional, derivado del nombre de archivo.
  {
    src: "/hero/Diseno-de-identidad_1-scaled.webp",
    alt: "Diseño de identidad",
    width: 2560,
    height: 1239,
  },
  // TODO(alt): provisional, derivado del nombre de archivo.
  {
    src: "/hero/Human-Marketing-Agencia-de-Marketing-Digital-en-Monterrey-1.webp",
    alt: "Proyecto destacado 1",
    width: 1920,
    height: 929,
  },
  // TODO(alt): provisional, derivado del nombre de archivo.
  {
    src: "/hero/Human-Marketing-Agencia-de-Marketing-Digital-en-Monterrey-2.webp",
    alt: "Proyecto destacado 2",
    width: 1920,
    height: 929,
  },
  // TODO(alt): provisional, derivado del nombre de archivo.
  {
    src: "/hero/Human-Marketing-Agencia-de-Marketing-Digital-en-Monterrey-5.webp",
    alt: "Proyecto destacado 5",
    width: 1920,
    height: 929,
  },
  // TODO(alt): provisional, derivado del nombre de archivo.
  {
    src: "/hero/Human-Marketing-Agencia-de-Marketing-Digital-en-Monterrey-6.webp",
    alt: "Proyecto destacado 6",
    width: 1920,
    height: 929,
  },
  // TODO(alt): provisional, derivado del nombre de archivo.
  {
    src: "/hero/Human-Marketing-Agencia-de-Marketing-Digital-en-Monterrey-8.webp",
    alt: "Proyecto destacado 8",
    width: 1920,
    height: 929,
  },
  // TODO(alt): provisional, derivado del nombre de archivo.
  {
    src: "/hero/Human-Marketing-Agencia-de-Marketing-Digital-en-Monterrey-11.webp",
    alt: "Proyecto destacado 11",
    width: 1920,
    height: 929,
  },
  // TODO(alt): provisional, derivado del nombre de archivo.
  {
    src: "/hero/Human-Marketing-Agencia-de-Marketing-Digital-en-Monterrey-15.webp",
    alt: "Proyecto destacado 15",
    width: 1920,
    height: 929,
  },
  // TODO(alt): provisional, derivado del nombre de archivo.
  {
    src: "/hero/Human-Marketing-Agencia-de-Marketing-Digital-en-Monterrey-19.webp",
    alt: "Proyecto destacado 19",
    width: 1920,
    height: 929,
  },
  // TODO(alt): provisional, derivado del nombre de archivo.
  {
    src: "/hero/Human-Marketing-Agencia-de-Marketing-Digital-en-Monterrey-21.webp",
    alt: "Proyecto destacado 21",
    width: 1920,
    height: 929,
  },
  // TODO(alt): provisional, derivado del nombre de archivo.
  {
    src: "/hero/Human-Marketing-Agencia-de-Marketing-Digital-en-Monterrey-24.webp",
    alt: "Proyecto destacado 24",
    width: 1920,
    height: 929,
  },
  // TODO(alt): provisional, derivado del nombre de archivo.
  {
    src: "/hero/Human-Marketing-Agencia-de-Marketing-Digital-en-Monterrey-27.webp",
    alt: "Proyecto destacado 27",
    width: 1920,
    height: 929,
  },
  // TODO(alt): provisional, derivado del nombre de archivo.
  {
    src: "/hero/Human-Marketing-Agencia-de-Marketing-Digital-en-Monterrey-29.webp",
    alt: "Proyecto destacado 29",
    width: 1920,
    height: 929,
  },
];
