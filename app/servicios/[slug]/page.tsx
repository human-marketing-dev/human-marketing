import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { OtrosProyectos } from "@/components/portafolio/OtrosProyectos";
import { Revelar } from "@/components/portafolio/Revelar";
import { Clientes } from "@/components/sections/clientes";
import { LeadForm } from "@/components/sections/lead-form";
import { PreguntasFrecuentes } from "@/components/servicios/PreguntasFrecuentes";
import { Button } from "@/components/ui/button";
import { ctasPorServicio } from "@/lib/ctas";
import { portafolio, type Proyecto } from "@/lib/portafolio";
import { servicios, type Servicio } from "@/lib/servicios";
import { getServicioDetalle, type ServicioDetalle } from "@/lib/servicios-detalle";
import { contacto, site } from "@/lib/site";

const slugDe = (s: Pick<Servicio, "href">) => s.href.split("/").pop()!;

// Solo existen los servicios de lib/servicios.ts; cualquier otro slug es 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return servicios.map((s) => ({ slug: slugDe(s) }));
}

function getServicio(slug: string) {
  return servicios.find((s) => slugDe(s) === slug);
}

export async function generateMetadata({
  params,
}: PageProps<"/servicios/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const servicio = getServicio(slug);
  if (!servicio) return {};
  const d = getServicioDetalle(slug);

  // Servicio sin copy todavia: pagina provisional fuera del indice.
  if (!d) {
    return {
      title: servicio.titulo,
      description: servicio.descripcion.slice(0, 155),
      robots: { index: false, follow: true },
    };
  }

  return {
    title: d.seo.titulo,
    description: d.seo.descripcion,
    alternates: { canonical: servicio.href },
    openGraph: {
      title: `${d.seo.titulo} | ${site.name}`,
      description: d.seo.descripcion,
      url: servicio.href,
    },
  };
}

/** Casos del portafolio para el carrusel: destacados primero, luego por categoria. */
function proyectosDe(d: ServicioDetalle): Proyecto[] {
  const destacados = (d.proyectos.destacados ?? [])
    .map((slug) => portafolio.find((p) => p.slug === slug))
    .filter((p): p is Proyecto => Boolean(p));
  const resto = portafolio.filter(
    (p) =>
      !destacados.includes(p) &&
      p.categorias.some((c) => d.proyectos.categorias.includes(c)),
  );
  return [...destacados, ...resto];
}

function jsonLd(servicio: Servicio, d: ServicioDetalle) {
  const url = `${site.url}${servicio.href}`;
  const org = { "@id": `${site.url}/#organizacion` };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": org["@id"],
        name: site.name,
        url: site.url,
        email: contacto.correo,
        telephone: `+${contacto.whatsapp}`,
      },
      {
        "@type": "Service",
        "@id": `${url}#servicio`,
        name: servicio.titulo,
        serviceType: d.seo.tipo,
        description: d.seo.descripcion,
        url,
        provider: org,
        areaServed: [
          { "@type": "City", name: "Monterrey" },
          { "@type": "Country", name: "México" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: d.incluye.titulo,
          itemListElement: d.incluye.items.map((i) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: i.titulo, description: i.texto },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
          { "@type": "ListItem", position: 2, name: "Servicios", item: `${site.url}/servicios` },
          { "@type": "ListItem", position: 3, name: servicio.titulo, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: d.faqs.map((f) => ({
          "@type": "Question",
          name: f.pregunta,
          acceptedAnswer: { "@type": "Answer", text: f.respuesta },
        })),
      },
    ],
  };
}

function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-muted-foreground text-sm tracking-widest uppercase ${className}`}>
      {children}
    </p>
  );
}

function Migas({ servicio }: { servicio: Servicio }) {
  return (
    <nav aria-label="Ruta de navegación">
      <ol className="text-muted-foreground flex flex-wrap items-center gap-1 text-sm">
        <li>
          <Link href="/" className="hover:text-tinta transition-colors">
            Inicio
          </Link>
        </li>
        <li className="flex items-center gap-1">
          <ChevronRight aria-hidden className="size-3.5" />
          <Link href="/servicios" className="hover:text-tinta transition-colors">
            Servicios
          </Link>
        </li>
        <li aria-current="page" className="text-tinta flex items-center gap-1">
          <ChevronRight aria-hidden className="text-muted-foreground size-3.5" />
          {servicio.titulo}
        </li>
      </ol>
    </nav>
  );
}

/** Servicio que aun no tiene copy en lib/servicios-detalle.ts. */
function Provisional({ servicio }: { servicio: Servicio }) {
  return (
    <>
      <Container className="py-16 lg:py-24">
        <Migas servicio={servicio} />
        <h1 className="mt-10 max-w-4xl text-4xl lg:text-6xl">{servicio.titulo}</h1>
        <p className="text-muted-foreground mt-6 max-w-3xl text-lg leading-relaxed">
          {servicio.descripcion}
        </p>
      </Container>
      <LeadForm />
    </>
  );
}

export default async function ServicioPage({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = getServicio(slug);
  if (!servicio) notFound();
  const d = getServicioDetalle(slug);
  if (!d) return <Provisional servicio={servicio} />;

  const cta = d.ctaServicio ? ctasPorServicio[d.ctaServicio] : undefined;
  const otros = servicios.filter((s) => s.href !== servicio.href);
  const proyectos = proyectosDe(d);

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd(servicio, d)).replace(/</g, "\\u003c"),
        }}
      />

      {/* 1. Hero: H1 con la keyword principal */}
      <header className="relative isolate overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-[40rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{ backgroundColor: servicio.color }}
        />
        <Container>
          <Migas servicio={servicio} />

          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-7">
              <Revelar>
                <Eyebrow>{d.hero.eyebrow}</Eyebrow>
                <h1 className="mt-3 text-4xl leading-[1.05] md:text-6xl lg:text-7xl">
                  {d.hero.h1 ?? servicio.titulo}
                </h1>
              </Revelar>
              <Revelar delay={0.1}>
                <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed lg:text-xl">
                  {d.hero.intro}
                </p>
              </Revelar>
              <Revelar delay={0.15}>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Button asChild size="lg" className="h-12 px-8">
                    <Link href="#contacto">COTIZAR UN SERVICIO</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-12 px-8">
                    <Link href="#que-incluye">CONOCER MÁS</Link>
                  </Button>
                </div>
              </Revelar>
            </div>

            <Revelar delay={0.2} className="lg:col-span-5">
              <ul className="flex flex-col gap-4 border-t border-tinta/15 pt-6">
                {d.hero.puntos.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-lg">
                    <span
                      className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full text-white"
                      style={{ backgroundColor: servicio.color }}
                    >
                      <Check aria-hidden className="size-3.5" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </Revelar>
          </div>
        </Container>
      </header>

      {/* 2. Beneficios */}
      <section aria-labelledby="beneficios-titulo" className="py-16 lg:py-24">
        <Container>
          <Revelar className="max-w-3xl">
            <Eyebrow>{d.beneficios.eyebrow}</Eyebrow>
            <h2 id="beneficios-titulo" className="mt-3 text-3xl lg:text-5xl">
              {d.beneficios.titulo}
            </h2>
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
              {d.beneficios.texto}
            </p>
          </Revelar>

          <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {d.beneficios.items.map((b, i) => (
              <li key={b.titulo}>
                <Revelar delay={i * 0.08} className="h-full rounded-3xl border border-tinta/10 p-8">
                  <span className="text-5xl" style={{ color: servicio.color }} aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 text-xl lg:text-2xl">{b.titulo}</h3>
                  <p className="text-muted-foreground mt-3 leading-relaxed">{b.texto}</p>
                </Revelar>
              </li>
            ))}
          </ol>

          <Revelar>
            <p className="mt-12 max-w-3xl text-xl leading-relaxed lg:text-2xl">
              {d.beneficios.cierre}
            </p>
          </Revelar>
        </Container>
      </section>

      {/* 3. Que incluye: superficie oscura, mismo lenguaje que las cards de Servicios */}
      <section
        id="que-incluye"
        aria-labelledby="que-incluye-titulo"
        className="scroll-mt-24 bg-surface-dark py-16 text-white lg:py-24"
      >
        <Container>
          <Revelar className="max-w-3xl">
            <Eyebrow className="text-white/60">{d.incluye.eyebrow}</Eyebrow>
            <h2 id="que-incluye-titulo" className="mt-3 text-3xl lg:text-5xl">
              {d.incluye.titulo}
            </h2>
          </Revelar>

          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {d.incluye.items.map((it, i) => (
              <li key={it.titulo}>
                <Revelar
                  delay={(i % 3) * 0.08}
                  className="group relative h-full overflow-hidden rounded-3xl border border-white/10 p-8"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-24 -left-24 size-60 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
                    style={{ backgroundColor: servicio.color }}
                  />
                  <h3 className="relative text-xl lg:text-2xl">{it.titulo}</h3>
                  <p className="relative mt-3 leading-relaxed text-white/70">{it.texto}</p>
                </Revelar>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 4. Que es y para quien es */}
      <section aria-labelledby="que-es-titulo" className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Revelar className="lg:col-span-6">
              <Eyebrow>{d.queEs.eyebrow}</Eyebrow>
              <h2 id="que-es-titulo" className="mt-3 text-3xl lg:text-5xl">
                {d.queEs.titulo}
              </h2>
              <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
                {d.queEs.definicion}
              </p>
            </Revelar>
            <Revelar delay={0.1} className="lg:col-span-6 lg:pt-10">
              <h3 className="text-xl lg:text-2xl">{d.queEs.paraQuienTitulo}</h3>
              <ul className="mt-6 border-t border-tinta/15">
                {d.queEs.paraQuien.map((p) => (
                  <li key={p} className="flex items-start gap-4 border-b border-tinta/15 py-5 text-lg">
                    <ArrowRight aria-hidden className="mt-1.5 size-4 shrink-0" style={{ color: servicio.color }} />
                    {p}
                  </li>
                ))}
              </ul>
            </Revelar>
          </div>
        </Container>
      </section>

      {/* 5. Por que impacta tus ventas */}
      <section aria-labelledby="por-que-titulo" className="pb-16 lg:pb-24">
        <Container>
          <div className="rounded-3xl bg-tinta/[0.03] p-8 md:p-12 lg:p-16">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <Revelar className="lg:col-span-6">
                <Eyebrow>{d.porQue.eyebrow}</Eyebrow>
                <h2 id="por-que-titulo" className="mt-3 text-3xl lg:text-5xl">
                  {d.porQue.titulo}
                </h2>
                <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
                  {d.porQue.texto}
                </p>
              </Revelar>
              <Revelar delay={0.1} className="lg:col-span-6 lg:pt-10">
                <p className="text-lg">{d.porQue.listaTitulo}</p>
                <ul className="mt-6 flex flex-col gap-4">
                  {d.porQue.lista.map((l) => (
                    <li key={l} className="flex items-start gap-3 text-lg">
                      <Check aria-hidden className="mt-1 size-5 shrink-0" style={{ color: servicio.color }} />
                      {l}
                    </li>
                  ))}
                </ul>
              </Revelar>
            </div>
            <Revelar>
              <p className="mt-14 border-t border-tinta/10 pt-10 text-3xl leading-tight lg:text-5xl">
                {d.porQue.frase}
              </p>
            </Revelar>
          </div>
        </Container>
      </section>

      {/* 6. Proyectos del servicio */}
      {proyectos.length > 0 && (
        <OtrosProyectos
          id="proyectos"
          eyebrow="Proyectos destacados"
          titulo={d.proyectos.titulo}
          proyectos={proyectos}
        />
      )}

      <Clientes />

      {/* 7. Preguntas frecuentes (tambien en el schema FAQPage) */}
      <section aria-labelledby="faq-titulo" className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Revelar className="lg:col-span-4">
              <Eyebrow>Preguntas frecuentes</Eyebrow>
              <h2 id="faq-titulo" className="mt-3 text-3xl lg:text-5xl">
                Dudas sobre {d.nombreCorto.toLowerCase()}
              </h2>
              <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
                ¿Tienes otra pregunta?{" "}
                <a
                  href={`https://wa.me/${contacto.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tinta underline underline-offset-4"
                >
                  Escríbenos por WhatsApp
                </a>
                .
              </p>
            </Revelar>
            <Revelar delay={0.1} className="lg:col-span-8">
              <PreguntasFrecuentes preguntas={d.faqs} />
            </Revelar>
          </div>
        </Container>
      </section>

      {/* 8. Enlazado interno a los demas servicios */}
      <section aria-labelledby="otros-servicios-titulo" className="pb-16 lg:pb-24">
        <Container>
          <Eyebrow>Servicios</Eyebrow>
          <h2 id="otros-servicios-titulo" className="mt-3 text-3xl lg:text-5xl">
            Otros servicios de marketing digital
          </h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {otros.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-surface-dark p-8 text-white"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-20 -left-20 size-52 rounded-full opacity-40 blur-3xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-70"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="relative text-xl">{s.titulo}</span>
                  <span className="relative mt-8 inline-flex items-center gap-2 text-white/80">
                    Explorar servicio
                    <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <LeadForm {...cta} />
    </article>
  );
}
