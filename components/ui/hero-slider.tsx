"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { HERO_ASPECT, heroSlides, type HeroSlide } from "@/lib/hero-slides";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 6000;

export interface HeroSliderProps {
  slides?: HeroSlide[];
}

export function HeroSlider({ slides = heroSlides }: HeroSliderProps) {
  const reduceMotion = useReducedMotion();
  const [api, setApi] = React.useState<CarouselApi>();

  // Sin movimiento: ni fade ni autoplay. Quedan las flechas y los indicadores.
  const plugins = React.useMemo(
    () =>
      reduceMotion
        ? []
        : [
            Fade(),
            Autoplay({
              delay: AUTOPLAY_MS,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ],
    [reduceMotion],
  );

  // Embla es la fuente de verdad de ambos valores. useSyncExternalStore los lee
  // sin espejarlos en useState, que es lo que obliga a llamar setState dentro
  // de un efecto y a arriesgar que se desincronicen.
  const subscribeSelected = React.useCallback(
    (onChange: () => void) => {
      if (!api) return () => {};
      api.on("select", onChange).on("reInit", onChange);
      return () => {
        api.off("select", onChange).off("reInit", onChange);
      };
    },
    [api],
  );
  const selected = React.useSyncExternalStore(
    subscribeSelected,
    () => api?.selectedScrollSnap() ?? 0,
    () => 0,
  );

  const subscribePlaying = React.useCallback(
    (onChange: () => void) => {
      if (!api) return () => {};
      api
        .on("autoplay:play", onChange)
        .on("autoplay:stop", onChange)
        .on("reInit", onChange);
      return () => {
        api
          .off("autoplay:play", onChange)
          .off("autoplay:stop", onChange)
          .off("reInit", onChange);
      };
    },
    [api],
  );
  const playing = React.useSyncExternalStore(
    subscribePlaying,
    () => Boolean(api?.plugins().autoplay?.isPlaying()),
    () => false,
  );

  const toggleAutoplay = React.useCallback(() => {
    const autoplay = api?.plugins().autoplay;
    if (!autoplay) return;
    if (autoplay.isPlaying()) autoplay.stop();
    else autoplay.play();
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: true, duration: reduceMotion ? 0 : 25 }}
      plugins={plugins}
      className="relative w-full"
    >
      <div
        className={cn(
          "relative w-full overflow-hidden",
          // El viewport que CarouselContent renderiza por dentro trae
          // `overflow-hidden` hardcodeado y no acepta className, asi que sin
          // esto queda en altura automatica y las slides colapsan a 0.
          "[&_[data-slot=carousel-content]]:h-full",
        )}
        // La proporcion sale de la constante, no de una clase hardcodeada:
        // cambiar el set de fotos es tocar HERO_ASPECT y nada mas.
        style={{ aspectRatio: HERO_ASPECT }}
      >
        <CarouselContent className="ml-0 h-full">
          {slides.map((slide, i) => (
            <CarouselItem
              key={slide.src}
              className="hero-slide relative h-full pl-0"
              data-active={i === selected}
            >
              <div className="hero-slide-media absolute inset-0">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  quality={82}
                  // La 1a es el LCP. La 2a tambien va con priority para que la
                  // primera transicion no parpadee. El resto, lazy.
                  priority={i < 2}
                  fetchPriority={i === 0 ? "high" : undefined}
                  loading={i < 2 ? undefined : "lazy"}
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <button
          type="button"
          onClick={() => api?.scrollPrev()}
          aria-label="Imagen anterior"
          className="absolute top-1/2 left-4 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-white/20 md:flex"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => api?.scrollNext()}
          aria-label="Imagen siguiente"
          className="absolute top-1/2 right-4 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-white/20 md:flex"
        >
          <ChevronRight className="size-5" />
        </button>

        <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2 px-4 md:bottom-5">
          <div className="flex max-w-[min(70%,560px)] flex-1 items-center gap-1 md:gap-1.5">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => api?.scrollTo(i)}
                aria-label={"Ir a la imagen " + (i + 1)}
                aria-current={i === selected ? "true" : undefined}
                className="group/ind h-4 flex-1 shrink-0"
              >
                <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-white/30 transition-colors group-hover/ind:bg-white/50">
                  {i === selected ? (
                    <span
                      key={selected}
                      className={cn(
                        "hero-progress-fill absolute inset-0 origin-left rounded-full bg-white",
                        !reduceMotion && "animate-[hero-progress_6s_linear_forwards]",
                      )}
                      style={{
                        animationPlayState: playing ? "running" : "paused",
                        transform: playing || reduceMotion ? undefined : "scaleX(1)",
                      }}
                    />
                  ) : null}
                </span>
              </button>
            ))}
          </div>

          {/* WCAG 2.2.2: todo contenido que se mueve solo necesita un control
              de pausa visible. */}
          <button
            type="button"
            onClick={toggleAutoplay}
            aria-label={playing ? "Pausar presentación" : "Reproducir presentación"}
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-white/20"
          >
            {playing ? (
              <Pause className="size-3.5 fill-white" />
            ) : (
              <Play className="size-3.5 fill-white" />
            )}
          </button>
        </div>
      </div>
    </Carousel>
  );
}

export default HeroSlider;
