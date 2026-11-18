import { ArrowUpRight, Star } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { resenas, type Resena } from "@/lib/resenas";
import { contacto } from "@/lib/site";

// Acentos de la paleta Human para los avatares, en el orden de las cards.
const ACENTOS = ["#1e28c8", "#6e1eaa", "#dc015b", "#fa505b"];

const formatoFecha = new Intl.DateTimeFormat("es-MX", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function iniciales(nombre: string) {
  const partes = nombre.split(/\s+/).filter(Boolean);
  return ((partes[0]?.[0] ?? "") + (partes[1]?.[0] ?? "")).toUpperCase();
}

function Estrellas({ valor }: { valor: number }) {
  return (
    <div
      role="img"
      aria-label={`${valor} de 5 estrellas`}
      className="flex gap-0.5"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          className={
            i < valor
              ? "size-4 fill-mostaza text-mostaza"
              : "size-4 text-tinta/20"
          }
        />
      ))}
    </div>
  );
}

function Card({ resena, acento }: { resena: Resena; acento: string }) {
  const fecha = new Date(`${resena.fecha}-01T00:00:00Z`);
  return (
    <figure className="mb-4 break-inside-avoid rounded-3xl border border-tinta/10 bg-papel p-6 lg:p-8">
      <Estrellas valor={resena.estrellas} />
      <blockquote className="mt-4 leading-relaxed">
        <p>“{resena.texto}”</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span
          aria-hidden
          className="flex size-10 shrink-0 items-center justify-center rounded-full text-sm text-white"
          style={{ backgroundColor: acento }}
        >
          {iniciales(resena.autor)}
        </span>
        <span className="flex flex-col">
          <span>{resena.autor}</span>
          <span className="text-muted-foreground text-sm">
            Reseña en Google ·{" "}
            <time dateTime={resena.fecha}>{formatoFecha.format(fecha)}</time>
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Home / Reseñas
 * Testimonios copiados del perfil de Google Business (ver lib/resenas.ts).
 */
export function Reviews() {
  return (
    <section
      id="resenas"
      aria-labelledby="resenas-titulo"
      className="mx-auto w-full max-w-site border-b border-tinta/10 py-16 lg:py-24"
    >
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-muted-foreground text-sm tracking-widest uppercase">
              Reseñas
            </p>
            <h2 id="resenas-titulo" className="mt-3 text-3xl lg:text-5xl">
              Lo que dicen nuestros clientes
            </h2>
          </div>
          <a
            href={contacto.google}
            target="_blank"
            rel="noopener noreferrer"
            className="group/cta inline-flex shrink-0 items-center gap-2"
          >
            Ver todas en Google
            <ArrowUpRight className="size-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
          </a>
        </div>

        <div className="mt-12 columns-1 gap-4 md:columns-2 lg:columns-3">
          {resenas.map((resena, i) => (
            <Card
              key={resena.autor}
              resena={resena}
              acento={ACENTOS[i % ACENTOS.length]}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
