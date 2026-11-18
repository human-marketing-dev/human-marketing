"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { PORTAFOLIO_ASPECT, type Imagen } from "@/lib/portafolio";

/**
 * Portada del caso: entra con desenfoque y, al hacer scroll, la imagen se
 * acerca un poco dentro de su marco (parallax suave, sin mover el layout).
 */
export function PortadaCaso({ imagen, nombre }: { imagen: Imagen; nombre: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 40, filter: "blur(16px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className="relative overflow-hidden rounded-3xl bg-tinta/5"
      style={{ aspectRatio: PORTAFOLIO_ASPECT }}
    >
      <motion.div
        className="absolute inset-0"
        style={reduceMotion ? undefined : { scale, y }}
      >
        <Image
          src={imagen.src}
          alt={imagen.alt ?? `Proyecto ${nombre}`}
          fill
          priority
          quality={82}
          sizes="(min-width: 1450px) 1322px, 100vw"
          className="object-cover"
        />
      </motion.div>
    </motion.div>
  );
}
