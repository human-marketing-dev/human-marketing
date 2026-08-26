import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Container } from "@/components/layout/Container";
import { RuixenGradientFooter } from "@/components/ui/ruixen-gradient-footer";
import {
  BehanceIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  VimeoIcon,
} from "@/components/ui/social-icons";
import { site } from "@/lib/site";

/**
 * Viñeta con el ícono de marca. Usa el archivo recortado a su bounding box:
 * el original trae 82% de lienzo transparente y a este tamaño la tinta
 * quedaría diminuta. `alt=""` + `aria-hidden` para que el lector de pantalla
 * no anuncie "mano" delante de cada elemento de la lista.
 */
function Item({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <Image
        src="/icon/human-marketing-hand-icon-white-trim.webp"
        alt=""
        aria-hidden
        width={473}
        height={451}
        className="mt-1 w-5 shrink-0 opacity-60"
      />
      <span>{children}</span>
    </li>
  );
}

function Titulo({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-4 text-sm tracking-widest text-white/50 uppercase">
      {children}
    </h3>
  );
}

const enlace = "text-white/80 transition-colors hover:text-white";

const REDES = [
  { nombre: "Instagram", href: "https://www.instagram.com/humanmarketingmx/", Icono: InstagramIcon },
  { nombre: "Facebook", href: "https://www.facebook.com/humanmarketingmx/", Icono: FacebookIcon },
  { nombre: "LinkedIn", href: "https://www.linkedin.com/company/humanmarketingmx/", Icono: LinkedInIcon },
  { nombre: "Behance", href: "https://www.behance.net/humanmarketing", Icono: BehanceIcon },
  { nombre: "Vimeo", href: "https://vimeo.com/humanmarketing", Icono: VimeoIcon },
];

export function Footer() {
  return (
    <RuixenGradientFooter className="bg-surface-dark w-full text-white">
      <Container>
        <div className="grid grid-cols-1 gap-8 pt-16 pb-12 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <Link href="/" aria-label="Human Marketing, ir al inicio">
              <Image
                src="/logos/human-marketing-logo-about-us.webp"
                alt="Human Marketing"
                width={1080}
                height={1080}
                sizes="160px"
                className="h-auto w-32 invert"
              />
            </Link>
          </div>

          <div>
            <Titulo>Datos de Contacto</Titulo>
            <ul className="list-none space-y-3">
              {/* TODO(dato): falta el número de WhatsApp. */}
              <Item>
                <a href="https://wa.me/52XXXXXXXXXX" className={enlace}>
                  WhatsApp
                </a>
              </Item>
              {/* TODO(dato): falta la dirección de correo. */}
              <Item>
                <a href="mailto:" className={enlace}>
                  Correo Electrónico
                </a>
              </Item>
              <Item>
                <a
                  href="https://share.google/8rEez1GuB0MOlirUV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={enlace}
                >
                  Google Maps
                </a>
              </Item>
            </ul>
          </div>

          <div>
            <Titulo>Navegación</Titulo>
            <ul className="list-none space-y-3">
              <Item>
                <Link href="/servicios" className={enlace}>
                  Servicios
                </Link>
              </Item>
              <Item>
                <Link href="/nosotros" className={enlace}>
                  Nosotros
                </Link>
              </Item>
              <Item>
                <Link href="/portafolio" className={enlace}>
                  Portafolio
                </Link>
              </Item>
              <Item>
                <Link href="/blog" className={enlace}>
                  Blog
                </Link>
              </Item>
            </ul>
          </div>

          <div>
            <Titulo>Recursos</Titulo>
            <ul className="list-none space-y-3">
              {/* TODO(ruta): falta destino del portal para clientes. */}
              <Item>
                <a href="#" className={enlace}>
                  Portal para Clientes
                </a>
              </Item>
              <Item>
                <Link href="/aviso-de-privacidad" className={enlace}>
                  Aviso de Privacidad
                </Link>
              </Item>
              {/* TODO(ruta): falta destino de términos del servicio. */}
              <Item>
                <a href="#" className={enlace}>
                  Términos del Servicio
                </a>
              </Item>
            </ul>
          </div>

          <div>
            <Titulo>Redes Sociales</Titulo>
            <ul className="flex list-none flex-wrap gap-2">
              {REDES.map(({ nombre, href, Icono }) => (
                <li key={nombre}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={nombre}
                    className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white/80 ring-1 ring-white/15 transition-colors hover:bg-white/20 hover:text-white"
                  >
                    <Icono className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-sm text-white/50">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. Todos los derechos
            reservados.
          </p>
        </div>
      </Container>
    </RuixenGradientFooter>
  );
}
