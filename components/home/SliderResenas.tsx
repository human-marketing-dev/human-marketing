"use client";

import { Children, useCallback, useEffect, useState, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Carrusel de reseñas: 1 tarjeta y un poco de la siguiente en movil, 2 en
 * tablet, 3 en escritorio. Avanza solo, se pausa mientras el mouse esta
 * encima y retoma al salir; sin autoplay con prefers-reduced-motion.
 */
export function SliderResenas({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const [emblaRef, embla] = useEmblaCarousel(
    { align: "start", loop: true, skipSnaps: false },
    reduceMotion ? [] : [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })],
  );
  const [actual, setActual] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const sync = useCallback(() => {
    if (!embla) return;
    setSnaps(embla.scrollSnapList());
    setActual(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    // Lectura inicial del estado de Embla: es un sistema externo, por eso
    // vive en el efecto y no en el render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    sync();
    embla.on("select", sync).on("reInit", sync);
    return () => {
      embla.off("select", sync).off("reInit", sync);
    };
  }, [embla, sync]);

  // Tras un click manual, reinicia la cuenta para que no salte enseguida.
  const reiniciarAutoplay = () => embla?.plugins().autoplay?.reset();

  const slides = Children.toArray(children);

  return (
    <div
      role="region"
      aria-roledescription="carrusel"
      aria-label="Reseñas de clientes"
    >
      <div ref={emblaRef} className="overflow-hidden">
        <ul className="-ml-4 flex touch-pan-y">
          {slides.map((slide, i) => (
            <li
              key={i}
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${i + 1} de ${slides.length}`}
              className="min-w-0 shrink-0 grow-0 basis-[88%] pl-4 md:basis-1/2 lg:basis-1/3"
            >
              {slide}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir a la reseña ${i + 1}`}
              aria-current={i === actual ? "true" : undefined}
              onClick={() => {
                reiniciarAutoplay();
                embla?.scrollTo(i);
              }}
              className="flex h-6 items-center"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-500",
                  i === actual ? "w-8 bg-tinta" : "w-1.5 bg-tinta/20 hover:bg-tinta/40",
                )}
              />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Reseña anterior"
            onClick={() => {
              reiniciarAutoplay();
              embla?.scrollPrev();
            }}
            className="flex size-11 items-center justify-center rounded-full border border-tinta/15 transition-colors hover:border-tinta hover:bg-tinta hover:text-papel"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Reseña siguiente"
            onClick={() => {
              reiniciarAutoplay();
              embla?.scrollNext();
            }}
            className="flex size-11 items-center justify-center rounded-full border border-tinta/15 transition-colors hover:border-tinta hover:bg-tinta hover:text-papel"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
