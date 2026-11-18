export const site = {
  name: "Human Marketing",
  // Dominio temporal de desarrollo. TODO: cambiar al dominio final antes de
  // publicar (afecta metadataBase, sitemap y robots). Sin diagonal final.
  url: "https://dev.humanmarketing.mx",
  locale: "es_MX",
  description:
    "PENDIENTE: descripcion meta del sitio (150-160 caracteres).",
} as const;

export const contacto = {
  /** Formato de wa.me: solo digitos, con lada de pais. */
  whatsapp: "5218144914316",
  correo: "info@humanmarketing.mx",
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Portafolio", href: "/portafolio" },
  { label: "Servicios", href: "/servicios" },
];
