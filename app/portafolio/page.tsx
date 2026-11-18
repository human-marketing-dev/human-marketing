import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { CtaProyecto } from "@/components/portafolio/CtaProyecto";
import { GaleriaPortafolio } from "@/components/portafolio/GaleriaPortafolio";
import { Reviews } from "@/components/home/Reviews";
import { AgenciaMarketingDigital } from "@/components/sections/agencia-marketing-digital";
import { Clientes } from "@/components/sections/clientes";
import { Servicios } from "@/components/sections/servicios";
import { VideosDestacados } from "@/components/sections/videos-destacados";
import { portafolio } from "@/lib/portafolio";

export const metadata: Metadata = {
  title: "Portafolio",
  description:
    "Proyectos de Human Marketing: identidad de marca, sitios web, e-commerce y campañas inmobiliarias para empresas en Monterrey y México.",
  alternates: { canonical: "/portafolio" },
};

export default function PortafolioPage() {
  return (
    <>
      <section className="pt-12 pb-10 lg:pt-20 lg:pb-14">
        <Container>
          <p className="text-muted-foreground text-sm tracking-widest uppercase">
            Portafolio
          </p>
          {/* TODO(copy): validar titulo y bajada. */}
          <h1 className="mt-3 max-w-5xl text-5xl leading-[1.05] lg:text-7xl">
            Marcas, sitios y campañas que hemos construido
          </h1>
          <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
            Identidad visual, desarrollo web y campañas para empresas B2B,
            industriales, inmobiliarias y de consumo.
          </p>
        </Container>
      </section>

      <section aria-label="Proyectos" className="pb-8">
        <Container>
          <GaleriaPortafolio proyectos={portafolio} />
        </Container>
      </section>

      <VideosDestacados />
      <AgenciaMarketingDigital eyebrow="Sobre Nosotros" nivel="h2" />
      <Clientes />
      <Servicios />
      <Reviews />
      <CtaProyecto />
    </>
  );
}
