"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { vimeoEmbedUrl, type FeaturedVideo } from "@/lib/videos";

export interface VideoShowcaseProps {
  videos: FeaturedVideo[];
  title: string;
  ctaLabel: string;
  ctaHref: string;
}

export function VideoShowcase({
  videos,
  title,
  ctaLabel,
  ctaHref,
}: VideoShowcaseProps) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = React.useState<FeaturedVideo | null>(null);

  const item = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20, filter: "blur(12px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const },
        },
      };

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.1 } },
          hidden: {},
        }}
        className="md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-5"
      >
        <motion.div
          variants={item}
          className="bg-muted/40 flex flex-col justify-end rounded-3xl p-6 md:col-span-2 lg:col-span-1"
        >
          <h2 className="text-3xl lg:text-4xl">{title}</h2>
          <Link
            href={ctaHref}
            className="group/cta mt-4 inline-flex items-center gap-2 self-start"
          >
            {ctaLabel}
            <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-1" />
          </Link>
        </motion.div>

        {/* Movil: riel horizontal. En md+ `contents` disuelve este wrapper y las
            cards pasan a ser hijas directas del grid. */}
        <div className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:mt-0 md:contents">
          {videos.map((video, i) => (
            <div
              key={video.id}
              className={cn(
                "w-[70vw] shrink-0 snap-center md:w-full",
                // offset alternado: 2a y 4a card, solo en lg
                i % 2 === 1 && "lg:translate-y-10",
              )}
            >
              <motion.div variants={item}>
                <button
                  type="button"
                  onClick={() => setActive(video)}
                  aria-label={"Reproducir video: " + video.title}
                  className="group relative block aspect-[9/16] w-full overflow-hidden rounded-3xl"
                >
                  <Image
                    src={video.poster}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 50vw, 70vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />

                  <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-colors duration-300 group-hover:from-black/85" />

                  <span className="absolute inset-0 flex items-center justify-center">
                    <span
                      className={cn(
                        "flex size-16 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur-md",
                        "transition-all duration-300",
                        // en touch el play siempre visible; solo se esconde
                        // donde el hover existe de verdad
                        "[@media(hover:hover)]:scale-90 [@media(hover:hover)]:opacity-0",
                        "[@media(hover:hover)]:group-hover:scale-100 [@media(hover:hover)]:group-hover:opacity-100",
                      )}
                    >
                      <Play className="size-6 fill-white text-white" />
                    </span>
                  </span>

                  <span className="absolute inset-x-0 bottom-0 p-4 text-left">
                    <span className="line-clamp-2 translate-y-1 text-sm text-white transition-transform duration-300 group-hover:translate-y-0">
                      {video.title}
                    </span>
                  </span>
                </button>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* El iframe solo existe mientras el modal esta abierto: al cerrar se
          desmonta y el audio se detiene de verdad. */}
      <Dialog
        open={active !== null}
        onOpenChange={(open) => {
          if (!open) setActive(null);
        }}
      >
        <DialogContent
          showCloseButton={false}
          aria-describedby={undefined}
          className="w-[min(92vw,calc(85vh*9/16))] max-w-none border-0 bg-transparent p-0 ring-0 sm:max-w-none"
        >
          <DialogTitle className="sr-only">{active?.title ?? ""}</DialogTitle>
          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-3xl bg-black">
            {active ? (
              <iframe
                key={active.id}
                src={vimeoEmbedUrl(active)}
                title={active.title}
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                className="absolute inset-0 h-full w-full border-0"
              />
            ) : null}
          </div>
          <DialogClose className="absolute -top-10 right-0 text-sm text-white/80 transition-colors hover:text-white">
            Cerrar
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default VideoShowcase;
