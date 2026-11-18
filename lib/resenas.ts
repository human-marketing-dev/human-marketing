export type Resena = {
  autor: string;
  /** 1 a 5. */
  estrellas: number;
  /**
   * Mes aproximado (AAAA-MM). Google muestra "hace N meses"; se guarda la
   * fecha calculada desde el 18 nov 2026 para que el texto no envejezca.
   */
  fecha: string;
  texto: string;
};

/**
 * Copiadas a mano del perfil de Google Business, textuales (incluidas las
 * erratas: son citas). Van en un carrusel, en este orden.
 * No llevan schema.org Review: Google no muestra estrellas para reseñas de un
 * negocio publicadas en su propio sitio.
 */
export const resenas: Resena[] = [
  {
    autor: "Diana Arreola",
    estrellas: 5,
    fecha: "2026-06",
    texto:
      "Contraté los servicios de Human Marketing para mi página web y de inmediato captaron la idea de lo que tenía en mente. Superaron por completo mis expectativas en tiempo, trabajo y diseño. Son muy profesionales. Me dieron muchas más ideas para que mis servicios como profesional se optimizaran. Los recomiendo ampliamente.",
  },
  {
    autor: "David Rodriguez",
    estrellas: 5,
    fecha: "2026-07",
    texto:
      "Después de colaborar con varias agencias de marketing digital en Monterrey, Human Marketing es claramente superior. Entienden el sector inmobiliario, generan leads de calidad y tienen un sistema de trabajo profesional y medible. Recomendadísima.",
  },
  {
    autor: "Jo Medina",
    estrellas: 5,
    fecha: "2026-05",
    texto:
      "Muy recomendados!! Desde el inicio te hacen sentir en confianza y siempre buscan la mejor solución para lo que necesitas, Alberto y Gerardo son súper atentos en cada etapa del proceso, profesionales y se nota que les importa hacer bien las cosas",
  },
  {
    autor: "Janeth Galindo",
    estrellas: 5,
    fecha: "2026-07",
    texto:
      "Super profesionales y entendidos, expertos en el gremio de diseño y desarrollo inmobiliario, y con una etica 100% apegada en favor del cliente. No podriamos estar mas contentas :)",
  },
  {
    autor: "Miguel de la Mora",
    estrellas: 5,
    fecha: "2026-05",
    texto: "Un servicio muy profesional con mucho seguimiento y estrategia!",
  },
  {
    autor: "Mirelle Hernández Garnica",
    estrellas: 5,
    fecha: "2026-05",
    texto:
      "Llevo algunos años trabajando con ellos y siempre han sido muy profesionales, cumplen con los tiempos de entrega, los resultados en general han sido muy positivos. 100% recomiendo sus servicios.",
  },
  {
    autor: "Carlos Bernal",
    estrellas: 5,
    fecha: "2026-05",
    texto:
      "Escelente agencia, son particularmente muy buenos en SEO y páginas web. 100% recomendado",
  },
  {
    autor: "Emilio Hernández Lee Arruel",
    estrellas: 5,
    fecha: "2026-05",
    texto:
      "Excelente servicio y acompañamiento en temas de contenido para redes sociales",
  },
];
