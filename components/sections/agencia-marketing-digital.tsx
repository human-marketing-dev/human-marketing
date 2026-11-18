import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text-fill";

type Props = {
  /** Texto del eyebrow sobre el logotipo en degradado. */
  eyebrow?: string;
  /**
   * En el Home el eyebrow es el h1 de la pagina. En cualquier otra pagina ya
   * hay un h1, asi que ahi se pinta como h2.
   */
  nivel?: "h1" | "h2";
};

export function AgenciaMarketingDigital({
  eyebrow = "Agencia de Marketing Digital",
  nivel = "h1",
}: Props = {}) {
  const Titulo = nivel;
  return (
    <section
      id="agencia-marketing-digital"
      aria-labelledby="agencia-marketing-digital-titulo"
      className="py-20 lg:py-32"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex justify-center">
            <Image
              src="/logos/human-marketing-logo-about-us.webp"
              alt="Human Marketing"
              width={1080}
              height={1080}
              sizes="(min-width: 1024px) 40vw, 80vw"
              className="h-auto w-full max-w-md"
            />
          </div>

          <div>
            <Titulo
              id="agencia-marketing-digital-titulo"
              className="text-muted-foreground mb-0 text-sm tracking-widest uppercase md:text-base"
            >
              {eyebrow}
            </Titulo>

            <p className="mb-6">
              <GradientText
                as="span"
                colors="#1e28c8, #6e1eaa, #dc015b, #fa505b, #ffd93c"
                className="pt-[0.05em] pb-[0.2em] text-5xl leading-none tracking-tight md:text-7xl"
              >
                Human Marketing&reg;
              </GradientText>
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Human Marketing&reg; es una agencia de marketing digital
              especializada en prospecci&oacute;n comercial para empresas B2B,
              industriales e inmobiliarias. Desde 2017 hemos ayudado a empresas
              a transformar sus canales digitales en sistemas reales de
              generaci&oacute;n de leads &mdash;con enfoque en resultados
              medibles y rentables.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button asChild variant="default" size="lg" className="h-12 px-8">
                <Link href="/servicios">CONOCER M&Aacute;S</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8">
                <Link href="/#contacto">COTIZAR UN SERVICIO</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
