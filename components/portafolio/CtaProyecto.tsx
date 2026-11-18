import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { WhatsAppIcon } from "@/components/ui/social-icons";
import { contacto } from "@/lib/site";

/**
 * Cierre de las paginas de portafolio: card oscura con orbes de la paleta,
 * el mismo lenguaje que las cards de Servicios.
 */
export function CtaProyecto() {
  return (
    <section aria-labelledby="cta-proyecto-titulo" className="py-16 lg:py-24">
      <Container>
        <div className="group relative isolate overflow-hidden rounded-3xl bg-surface-dark px-8 py-14 text-white lg:px-16 lg:py-20">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-32 -left-24 -z-10 size-96 rounded-full bg-azul opacity-50 blur-3xl transition-transform duration-700 group-hover:scale-110"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -right-24 -bottom-40 -z-10 size-96 rounded-full bg-rojo opacity-40 blur-3xl transition-transform duration-700 group-hover:scale-110"
          />
          <p className="text-sm tracking-widest text-white/60 uppercase">
            Tu proyecto sigue
          </p>
          {/* TODO(copy): validar titulo y texto. */}
          <h2
            id="cta-proyecto-titulo"
            className="mt-3 max-w-3xl text-3xl lg:text-5xl"
          >
            ¿Tienes un proyecto en mente?
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            Cuéntanos qué necesitas y te proponemos una estrategia para
            convertirlo en oportunidades comerciales.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/#contacto"
              className="group/cta inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-tinta transition-transform hover:scale-[1.02]"
            >
              Cotizar un proyecto
              <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-1" />
            </Link>
            <a
              href={`https://wa.me/${contacto.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 transition-colors hover:bg-white/10"
            >
              <WhatsAppIcon className="size-4" />
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
