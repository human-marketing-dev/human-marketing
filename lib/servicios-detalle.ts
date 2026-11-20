import type { ServicioCta } from "@/lib/ctas";
import type { Categoria } from "@/lib/portafolio";

/**
 * Contenido de cada pagina /servicios/[slug], escrito para SEO.
 * La pagina es una plantilla: agregar un servicio = agregar una entrada aqui.
 * El titulo, color y href salen de lib/servicios.ts (misma fuente que el Home).
 */

export type Item = { titulo: string; texto: string };
export type Pregunta = { pregunta: string; respuesta: string };

export type ServicioDetalle = {
  /** Debe coincidir con el final del href en lib/servicios.ts. */
  slug: string;
  seo: {
    /** Sin " | Human Marketing": lo agrega el template del layout. Ideal <= 45 caracteres. */
    titulo: string;
    /** 140-160 caracteres, con la keyword principal al inicio. */
    descripcion: string;
    /** Nombre del tipo de servicio para schema.org (serviceType). */
    tipo: string;
  };
  /** Nombre corto para migas de pan y textos de apoyo. */
  nombreCorto: string;
  hero: {
    eyebrow: string;
    /** H1. Si falta, se usa el titulo de lib/servicios.ts. */
    h1?: string;
    intro: string;
    puntos: string[];
  };
  beneficios: {
    eyebrow: string;
    titulo: string;
    texto: string;
    items: Item[];
    cierre: string;
  };
  incluye: {
    eyebrow: string;
    titulo: string;
    items: Item[];
  };
  queEs: {
    eyebrow: string;
    titulo: string;
    definicion: string;
    paraQuienTitulo: string;
    paraQuien: string[];
  };
  porQue: {
    eyebrow: string;
    titulo: string;
    texto: string;
    listaTitulo: string;
    lista: string[];
    frase: string;
  };
  proyectos: {
    titulo: string;
    /** Categorias del portafolio que se muestran. */
    categorias: Categoria[];
    /** Casos que van primero, en este orden. */
    destacados?: string[];
  };
  /** TODO(copy): las FAQs son propuesta de redaccion; validarlas con Human. */
  faqs: Pregunta[];
  ctaServicio?: ServicioCta;
};

export const serviciosDetalle: ServicioDetalle[] = [
  {
    slug: "diseno-de-identidad-y-activos-comerciales",
    ctaServicio: "branding",
    nombreCorto: "Identidad y Activos Comerciales",
    seo: {
      titulo: "Diseño de Identidad y Branding en Monterrey",
      descripcion:
        "Diseño de identidad corporativa y materiales comerciales en Monterrey: logotipo, presentaciones, brochures y plantillas que generan confianza y ayudan a vender.",
      tipo: "Diseño de identidad corporativa y materiales comerciales",
    },
    hero: {
      eyebrow: "Branding y diseño comercial en Monterrey",
      intro:
        "Diseñamos la identidad visual de tu marca y los materiales comerciales que usa tu equipo de ventas, alineados a tu proceso comercial, para comunicar con claridad, transmitir confianza y facilitar la generación de oportunidades de negocio.",
      puntos: [
        "Identidad visual sólida y coherente",
        "Materiales diseñados para vender, no solo para verse bien",
        "Entregables en formatos prácticos para juntas, correos y eventos",
        "Versiones listas para impresión y para uso digital",
      ],
    },
    beneficios: {
      eyebrow: "Beneficios estratégicos",
      titulo: "Tus activos comerciales son la base de tu comunicación y de tus ventas",
      texto:
        "En mercados competitivos no basta con tener un buen producto o servicio: también necesitas comunicarlo con precisión e impacto. Una identidad clara y materiales comerciales bien diseñados logran:",
      items: [
        {
          titulo: "Confianza inmediata",
          texto: "Generan confianza y credibilidad instantánea ante tus prospectos desde el primer contacto.",
        },
        {
          titulo: "Respaldo al equipo comercial",
          texto: "Facilitan y respaldan el trabajo de tus vendedores con herramientas claras para presentar tu oferta.",
        },
        {
          titulo: "Un mismo mensaje",
          texto: "Unifican el mensaje en todos los puntos de contacto: sitio web, juntas, redes sociales y correo.",
        },
        {
          titulo: "Más conversión",
          texto: "Mejoran la conversión durante cotizaciones, reuniones y seguimiento comercial.",
        },
      ],
      cierre:
        "Cuando tus materiales elevan la percepción de tu marca, el proceso de venta se vuelve más fluido y efectivo.",
    },
    incluye: {
      eyebrow: "Sobre el servicio",
      titulo: "¿Qué incluye nuestro servicio de diseño de identidad y activos comerciales?",
      items: [
        {
          titulo: "Diseño de identidad corporativa (branding)",
          texto: "Logotipo, paleta de color, tipografías y sistema visual, con lineamientos de uso para aplicar tu marca de forma consistente.",
        },
        {
          titulo: "Presentaciones corporativas y comerciales",
          texto: "Presentaciones institucionales, corporativas y de ventas alineadas a tu proceso comercial.",
        },
        {
          titulo: "Brochures, fichas técnicas y folletos",
          texto: "Fichas de producto, folletos y material técnico que comunican el valor de tu oferta de forma clara.",
        },
        {
          titulo: "Materiales para marketing y eventos",
          texto: "Espectaculares, pósters, materiales promocionales y plantillas para WhatsApp, email y redes sociales.",
        },
        {
          titulo: "Redacción y edición comercial",
          texto: "Copywriting y storytelling para clientes que requieren apoyo en el contenido de sus materiales.",
        },
        {
          titulo: "Archivos editables y listos para impresión",
          texto: "Formatos abiertos y editables, más versiones optimizadas para uso digital.",
        },
      ],
    },
    queEs: {
      eyebrow: "Qué es y para quién es",
      titulo: "¿Qué son la identidad y los activos comerciales, y cuándo conviene implementarlos?",
      definicion:
        "La identidad y los activos comerciales son el conjunto de materiales que representan a tu marca y respaldan a tu equipo comercial en cada interacción con prospectos: desde el logotipo y el sistema visual hasta las presentaciones, brochures y plantillas que se usan para vender.",
      paraQuienTitulo: "Es para ti si eres:",
      paraQuien: [
        "Una empresa que desea profesionalizar su presencia y su comunicación.",
        "Un negocio B2B cuyo valor no se transmite correctamente en sus materiales actuales.",
        "Una marca en crecimiento que necesita consolidar una identidad visual coherente.",
        "Un equipo comercial que necesita herramientas claras para vender mejor.",
      ],
    },
    porQue: {
      eyebrow: "Diseño de identidad",
      titulo: "¿Por qué la identidad visual y los activos comerciales impactan directamente tus ventas?",
      texto:
        "La forma en la que presentas tu marca influye en la percepción de tu experiencia, calidad y profesionalismo.",
      listaTitulo: "Las empresas con identidad sólida y materiales comerciales bien diseñados suelen:",
      lista: [
        "Acelerar la confianza en las primeras reuniones",
        "Transmitir claridad y diferenciación frente a sus competidores",
        "Disminuir objeciones durante el proceso comercial",
        "Obtener mejores resultados al enviar cotizaciones y propuestas",
      ],
      frase: "Un diseño bonito ayuda. Un diseño estratégico vende.",
    },
    proyectos: {
      titulo: "Proyectos de diseño de identidad y activos comerciales",
      categorias: ["identidad"],
      destacados: ["no-traigo-lonche"],
    },
    faqs: [
      {
        pregunta: "¿Qué diferencia hay entre diseñar un logotipo y una identidad corporativa?",
        respuesta:
          "El logotipo es solo una pieza. La identidad corporativa es el sistema completo: logotipo, paleta de color, tipografías, estilo visual y lineamientos de uso que mantienen tu marca coherente en todos los puntos de contacto.",
      },
      {
        pregunta: "¿Qué son los activos comerciales de una empresa?",
        respuesta:
          "Son los materiales que tu equipo usa para presentar y vender: presentaciones corporativas, brochures, fichas de producto, propuestas, plantillas para WhatsApp y correo, y materiales para eventos.",
      },
      {
        pregunta: "Ya tengo logotipo, ¿pueden diseñar solo mis materiales comerciales?",
        respuesta:
          "Sí. Partimos de tu identidad actual y diseñamos los activos que necesitas. Si detectamos inconsistencias en tu marca, te recomendamos cómo ordenarlas para que todo comunique lo mismo.",
      },
      {
        pregunta: "¿En qué formatos entregan los materiales?",
        respuesta:
          "Entregamos archivos editables en formatos abiertos, junto con versiones listas para impresión y optimizadas para uso digital, para que puedas usarlos en juntas, correos, redes sociales y eventos.",
      },
      {
        pregunta: "¿También redactan los textos de los materiales?",
        respuesta:
          "Sí. Si lo necesitas, nuestro equipo se encarga de la redacción y edición comercial, y del storytelling de tus presentaciones y brochures.",
      },
      {
        pregunta: "¿Cómo cotizo un proyecto de identidad y activos comerciales?",
        respuesta:
          "Escríbenos por el formulario de esta página o por WhatsApp. Revisamos tu marca, tus materiales actuales y tu proceso de ventas, y te enviamos una propuesta a la medida.",
      },
    ],
  },
];

export function getServicioDetalle(slug: string) {
  return serviciosDetalle.find((s) => s.slug === slug);
}
