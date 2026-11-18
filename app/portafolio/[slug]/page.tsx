import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { LeadForm } from "@/components/sections/lead-form";
import { PortadaCaso } from "@/components/portafolio/PortadaCaso";
import { Revelar } from "@/components/portafolio/Revelar";
import {
  CATEGORIAS,
  PORTAFOLIO_ASPECT,
  getProyecto,
  portafolio,
  rutaProyecto,
  siguienteProyecto,
  type Proyecto,
} from "@/lib/portafolio";

// Solo existen los casos de lib/portafolio.ts; cualquier otro slug es 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return portafolio.map((p) => ({ slug: p.slug }));
}

function descripcion(p: Proyecto) {
  return (
    p.resumen ??
    `${p.servicio} para ${p.nombre}. Caso de éxito de Human Marketing, agencia de marketing digital en Monterrey.`
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/portafolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProyecto(slug);
  if (!p) return {};
  return {
    title: `${p.nombre} · ${p.servicio}`,
    description: descripcion(p),
    alternates: { canonical: rutaProyecto(p) },
    openGraph: {
      title: p.nombre,
      description: descripcion(p),
      images: [{ url: p.portada.src, width: p.portada.width, height: p.portada.height }],
    },
  };
}

function Dato({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className="border-t border-tinta/10 pt-4">
      <dt className="text-muted-foreground text-xs tracking-widest uppercase">
        {etiqueta}
      </dt>
      <dd className="mt-2">{valor}</dd>
    </div>
  );
}

function Bloque({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <Revelar className="grid gap-4 border-t border-tinta/10 pt-8 lg:grid-cols-12">
      <h2 className="text-muted-foreground text-sm tracking-widest uppercase lg:col-span-4">
        {titulo}
      </h2>
      <p className="text-xl leading-relaxed lg:col-span-8 lg:text-2xl">{texto}</p>
    </Revelar>
  );
}

export default async function CasoPage({ params }: PageProps<"/portafolio/[slug]">) {
  const { slug } = await params;
  const p = getProyecto(slug);
  if (!p) notFound();

  const siguiente = siguienteProyecto(p.slug);
  const tieneHistoria = Boolean(p.reto || p.solucion || p.resultados?.length);

  return (
    <article>
      <header className="relative isolate overflow-hidden pt-8 pb-10 lg:pt-14 lg:pb-14">
        {/* Orbe del color del proyecto detras del titulo. */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-[36rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{ backgroundColor: p.color }}
        />
        <Container>
          <Link
            href="/portafolio"
            className="group/back text-muted-foreground hover:text-tinta inline-flex items-center gap-2 text-sm transition-colors"
          >
            <ArrowLeft className="size-4 transition-transform group-hover/back:-translate-x-1" />
            Portafolio
          </Link>

          <Revelar>
            <p className="text-muted-foreground mt-10 text-sm tracking-widest uppercase">
              {p.servicio}
            </p>
            <h1 className="mt-3 text-5xl leading-[1.05] lg:text-8xl">{p.nombre}</h1>
          </Revelar>

          {p.resumen && (
            <Revelar delay={0.1}>
              <p className="text-muted-foreground mt-6 max-w-3xl text-lg leading-relaxed lg:text-xl">
                {p.resumen}
              </p>
            </Revelar>
          )}

          <Revelar delay={0.15}>
            <dl className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
              <Dato etiqueta="Servicio" valor={p.servicio} />
              <Dato
                etiqueta="Categoría"
                valor={p.categorias.map((c) => CATEGORIAS[c]).join(", ")}
              />
              {p.industria && <Dato etiqueta="Industria" valor={p.industria} />}
              {p.anio && <Dato etiqueta="Año" valor={p.anio} />}
            </dl>
          </Revelar>
        </Container>
      </header>

      <Container>
        <PortadaCaso imagen={p.portada} nombre={p.nombre} />
      </Container>

      {tieneHistoria && (
        <section aria-label="El caso" className="py-16 lg:py-24">
          <Container>
            <div className="flex flex-col gap-12">
              {p.reto && <Bloque titulo="El reto" texto={p.reto} />}
              {p.solucion && <Bloque titulo="Lo que hicimos" texto={p.solucion} />}
              {p.resultados && p.resultados.length > 0 && (
                <Revelar className="grid gap-4 border-t border-tinta/10 pt-8 lg:grid-cols-12">
                  <h2 className="text-muted-foreground text-sm tracking-widest uppercase lg:col-span-4">
                    Resultados
                  </h2>
                  <dl className="grid grid-cols-2 gap-8 lg:col-span-8 lg:grid-cols-3">
                    {p.resultados.map((r) => (
                      <div key={r.etiqueta}>
                        <dt className="sr-only">{r.etiqueta}</dt>
                        <dd>
                          <span className="block text-5xl lg:text-6xl" style={{ color: p.color }}>
                            {r.valor}
                          </span>
                          <span className="text-muted-foreground mt-2 block">
                            {r.etiqueta}
                          </span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Revelar>
              )}
            </div>
          </Container>
        </section>
      )}

      {p.galeria.length > 0 && (
        <section aria-label="Galería" className={tieneHistoria ? "pb-16 lg:pb-24" : "py-6 lg:py-6"}>
          <Container>
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {p.galeria.map((img, i) => {
                // Impar al final: la ultima ocupa todo el ancho para no dejar hueco.
                const ancha = p.galeria.length % 2 === 1 && i === p.galeria.length - 1;
                return (
                  <li key={img.src} className={ancha ? "md:col-span-2" : undefined}>
                    <Revelar delay={ancha ? 0 : (i % 2) * 0.1}>
                      <div
                        className="relative overflow-hidden rounded-3xl bg-tinta/5"
                        style={{ aspectRatio: PORTAFOLIO_ASPECT }}
                      >
                        <Image
                          src={img.src}
                          alt={img.alt ?? ""}
                          fill
                          quality={82}
                          sizes={ancha ? "(min-width: 1450px) 1322px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                          className="object-cover"
                        />
                      </div>
                    </Revelar>
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>
      )}

      <nav aria-label="Siguiente proyecto" className="pt-16 lg:pt-24">
        <Container>
          <Link
            href={rutaProyecto(siguiente)}
            className="group relative block overflow-hidden rounded-3xl bg-surface-dark text-white"
          >
            <div className="relative" style={{ aspectRatio: "31 / 9" }}>
              <Image
                src={siguiente.portada.src}
                alt=""
                fill
                sizes="(min-width: 1450px) 1322px, 100vw"
                className="object-cover opacity-50 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 lg:p-10">
                <div>
                  <p className="text-sm tracking-widest text-white/70 uppercase">
                    Siguiente proyecto
                  </p>
                  <p className="mt-2 text-3xl lg:text-6xl">{siguiente.nombre}</p>
                </div>
                <span
                  aria-hidden
                  className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-tinta transition-transform duration-300 group-hover:translate-x-1 lg:size-16"
                >
                  <ArrowRight className="size-5 lg:size-6" />
                </span>
              </div>
            </div>
          </Link>
        </Container>
      </nav>

      <LeadForm />
    </article>
  );
}
