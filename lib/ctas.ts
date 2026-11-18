/**
 * Textos del formulario de cierre segun el servicio principal del caso.
 * Sin entrada para un servicio, el formulario usa su texto general.
 * TODO(copy): faltan web, contenidos, campanas, inmobiliario y estrategia.
 */
export type CtaServicio = {
  titulo: string;
  texto: string;
  cierre: string;
};

export type ServicioCta =
  | "branding"
  | "web"
  | "contenidos"
  | "campanas"
  | "inmobiliario"
  | "estrategia";

export const ctasPorServicio: Partial<Record<ServicioCta, CtaServicio>> = {
  branding: {
    titulo: "Impulsa tu marca con Branding estratégico",
    texto:
      "Si buscas construir una marca clara, coherente y lista para competir —desde la identidad hasta su ejecución digital— nuestro servicio de Branding te ayuda a hacerlo con enfoque comercial y resultados reales.",
    cierre: "Hablemos de tu proyecto de Branding.",
  },
};
