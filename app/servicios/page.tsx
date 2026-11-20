import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

import { Reviews } from "@/components/home/Reviews";
import { Container } from "@/components/layout/Container";
import { Revelar } from "@/components/portafolio/Revelar";
import { AgenciaMarketingDigital } from "@/components/sections/agencia-marketing-digital";
import { Clientes } from "@/components/sections/clientes";
import { LeadForm } from "@/components/sections/lead-form";
import { Button } from "@/components/ui/button";
import { servicios } from "@/lib/servicios";
import { site } from "@/lib/site";

const TITULO = "Servicios de Marketing Digital en Monterrey";
const DESCRIPCION =
  "Servicios de marketing digital en Monterrey: branding, desarrollo web y SEO, contenido para redes, campañas de Google y Meta Ads y estrategia comercial.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  alternates: { canonical: "/servicios" },
  openGraph: {
    title: `${TITULO} | ${site.name}`,
    description: DESCRIPCION,
    url: "/servicios",
  },
};

function jsonLd() {
  const url = `${site.url}/servicios`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#pagina`,
        name: TITULO,
        description: DESCRIPCION,
        url,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: servicios.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${site.url}${s.href}`,
            name: s.titulo,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
          { "@type": "ListItem", position: 2, name: "Servicios", item: url },
        ],
      },
    ],
  };
}

export default function ServiciosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c"),
        }}
      />

      <header className="relative isolate overflow-hidden pt-8 pb-12 lg:pt-14 lg:pb-16">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-48 left-1/2 -z-10 size-[44rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{
            backgroundImage:
              "conic-gradient(from 90deg, #1e28c8, #6e1eaa, #dc015b, #fa505b, #ffd93c, #1e28c8)",
          }}
        />
        <Container>
          <nav aria-label="Ruta de navegación">
            <ol className="text-muted-foreground flex items-center gap-1 text-sm">
              <li>
                <Link href="/" className="hover:text-tinta transition-colors">
                  Inicio
                </Link>
              </li>
              <li aria-current="page" className="text-tinta flex items-center gap-1">
                <ChevronRight aria-hidden className="text-muted-foreground size-3.5" />
                Servicios
              </li>
            </ol>
          </nav>

          <Revelar className="mt-10 max-w-4xl">
            <p className="text-muted-foreground text-sm tracking-widest uppercase">
              Nuestros servicios
            </p>
            <h1 className="mt-3 text-4xl leading-[1.05] md:text-6xl lg:text-7xl">
              {TITULO}
            </h1>
            <p className="text-muted-foreground mt-6 max-w-3xl text-lg leading-relaxed lg:text-xl">
              En Human Marketing diseñamos estrategias enfocadas en generar
              oportunidades comerciales reales: atraer prospectos, calificarlos
              mejor y convertirlos en ventas. Nuestros servicios trabajan como un
              sistema completo que impulsa el rendimiento de tus campañas, tu
              sitio web y tu equipo comercial.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="h-12 px-8">
                <Link href="#contacto">COTIZAR UN SERVICIO</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8">
                <Link href="/portafolio">VER PORTAFOLIO</Link>
              </Button>
            </div>
          </Revelar>
        </Container>
      </header>

      {/* Un bloque por servicio, cada uno con su H2 y enlace a su pagina. */}
      <section aria-label="Lista de servicios" className="pb-16 lg:pb-24">
        <Container>
          <ol className="flex flex-col gap-4">
            {servicios.map((s, i) => (
              <li key={s.href}>
                <Revelar>
                  <article className="group relative isolate overflow-hidden rounded-3xl bg-surface-dark p-8 text-white md:p-12 lg:p-14">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -top-32 -left-32 -z-10 size-96 rounded-full opacity-40 blur-3xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-70"
                      style={{ backgroundColor: s.color }}
                    />
                    <Image
                      src={s.icono.src}
                      alt=""
                      aria-hidden
                      width={s.icono.width}
                      height={s.icono.height}
                      sizes="400px"
                      className="pointer-events-none absolute -right-36 -bottom-24 -z-10 h-80 w-auto opacity-[0.05] transition-opacity duration-500 group-hover:opacity-[0.09]"
                    />
                    <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
                      <span className="text-5xl text-white/40 lg:col-span-1" aria-hidden>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-3xl lg:col-span-5 lg:text-4xl">
                        <Link href={s.href} className="after:absolute after:inset-0">
                          {s.titulo}
                        </Link>
                      </h2>
                      <div className="lg:col-span-6">
                        <p className="text-lg leading-relaxed text-white/70">{s.descripcion}</p>
                        <span className="mt-8 inline-flex items-center gap-2">
                          Explorar servicio
                          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Revelar>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <AgenciaMarketingDigital eyebrow="Sobre Nosotros" nivel="h2" />
      <Clientes />
      <Reviews />
      <LeadForm />
    </>
  );
}
