"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { CardProyecto } from "@/components/portafolio/GaleriaPortafolio";
import type { Proyecto } from "@/lib/portafolio";

const flecha =
  "flex size-11 items-center justify-center rounded-full border border-tinta/15 transition-colors hover:border-tinta hover:bg-tinta hover:text-papel disabled:pointer-events-none disabled:opacity-30";

/** Carrusel de los demas casos al pie de cada proyecto: 1, 2 o 3 visibles. */
export function OtrosProyectos({ proyectos }: { proyectos: Proyecto[] }) {
  const [emblaRef, embla] = useEmblaCarousel({ align: "start", loop: false });
  const [puedePrev, setPuedePrev] = useState(false);
  const [puedeNext, setPuedeNext] = useState(false);

  const sync = useCallback(() => {
    if (!embla) return;
    setPuedePrev(embla.canScrollPrev());
    setPuedeNext(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    // Estado inicial leido de Embla (sistema externo).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    sync();
    embla.on("select", sync).on("reInit", sync);
    return () => {
      embla.off("select", sync).off("reInit", sync);
    };
  }, [embla, sync]);

  return (
    <section aria-labelledby="otros-proyectos-titulo" className="py-16 lg:py-24">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-muted-foreground text-sm tracking-widest uppercase">
              Portafolio
            </p>
            <h2 id="otros-proyectos-titulo" className="mt-3 text-3xl lg:text-5xl">
              Más proyectos
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/portafolio"
              className="group/cta mr-2 inline-flex items-center gap-2"
            >
              Ver todo
              <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-1" />
            </Link>
            <button
              type="button"
              aria-label="Proyectos anteriores"
              onClick={() => embla?.scrollPrev()}
              disabled={!puedePrev}
              className={flecha}
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Más proyectos"
              onClick={() => embla?.scrollNext()}
              disabled={!puedeNext}
              className={flecha}
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <div ref={emblaRef} className="mt-10 overflow-hidden">
          <ul className="-ml-6 flex touch-pan-y">
            {proyectos.map((p) => (
              <li
                key={p.slug}
                className="min-w-0 shrink-0 grow-0 basis-[85%] pl-6 md:basis-1/2 lg:basis-1/3"
              >
                <CardProyecto proyecto={p} nivel="h3" />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
