import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { OtrosProyectos } from "@/components/portafolio/OtrosProyectos";
import { AgenciaMarketingDigital } from "@/components/sections/agencia-marketing-digital";
import { Clientes } from "@/components/sections/clientes";
import { LeadForm } from "@/components/sections/lead-form";
import { Servicios } from "@/components/sections/servicios";
import { ctasPorServicio } from "@/lib/ctas";
import { DetallesProyecto } from "@/components/portafolio/DetallesProyecto";
import { PortadaCaso } from "@/components/portafolio/PortadaCaso";
import { Revelar } from "@/components/portafolio/Revelar";
import {
  PORTAFOLIO_ASPECT,
  getProyecto,
  portafolio,
  rutaProyecto,
  otrosProyectos,
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

  const cta = p.ctaServicio ? ctasPorServicio[p.ctaServicio] : undefined;
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

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-16">
            <div className="lg:col-span-7">
              <Revelar>
                <p className="text-muted-foreground text-sm tracking-widest uppercase">
                  {p.servicio}
                </p>
                <h1 className="mt-3 text-5xl leading-[1.05] uppercase lg:text-8xl">
                  {p.nombre}
                </h1>
              </Revelar>

              {p.resumen && (
                <Revelar delay={0.1}>
                  <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed lg:text-xl">
                    {p.resumen}
                  </p>
                </Revelar>
              )}

              {p.etiquetas && p.etiquetas.length > 0 && (
                <Revelar delay={0.15}>
                  <ul aria-label="Servicios del proyecto" className="mt-8 flex flex-wrap gap-2">
                    {p.etiquetas.map((e) => (
                      <li
                        key={e}
                        className="rounded-full border border-tinta/15 bg-papel/60 px-4 py-2 text-sm backdrop-blur"
                      >
                        {e}
                      </li>
                    ))}
                  </ul>
                </Revelar>
              )}
            </div>

            <Revelar delay={0.2} className="lg:col-span-5">
              <DetallesProyecto
                filas={[
                  { etiqueta: "Cliente", valor: p.cliente ?? p.nombre },
                  ...(p.industria ? [{ etiqueta: "Industria", valor: p.industria }] : []),
                  { etiqueta: "Servicios", valor: p.servicios ?? [p.servicio] },
                  ...(p.anio ? [{ etiqueta: "Año", valor: p.anio }] : []),
                ]}
              />
            </Revelar>
          </div>
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

      <OtrosProyectos proyectos={otrosProyectos(p.slug)} />
      <AgenciaMarketingDigital eyebrow="Sobre Nosotros" nivel="h2" />
      <Clientes />
      <Servicios />

      <LeadForm {...cta} />
    </article>
  );
}
