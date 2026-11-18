"use client";

import Image from "next/image";
import Link from "next/link";
import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import {
  PORTAFOLIO_ASPECT,
  portafolioHome,
  rutaProyecto,
  type Proyecto,
} from "@/lib/portafolio";

// Fila 1: tres cards de 2 columnas. Fila 2: dos de 3.
// De chico a grande, al reves del bento de Servicios.
const SPANS = [
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
];

function Card({ proyecto }: { proyecto: Proyecto }) {
  const uid = useId();
  const servicioId = `${uid}-servicio`;
  const nombreId = `${uid}-nombre`;

  return (
    <article className="group relative">
      <div
        className="relative overflow-hidden rounded-3xl"
        style={{ aspectRatio: PORTAFOLIO_ASPECT }}
      >
        <Image
          src={proyecto.portada.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          loading="lazy"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>

      {/* El texto va debajo de la imagen, no encima: son capturas de trabajo
          real y taparlas con un degradado desperdicia lo que se quiere enseñar. */}
      <div className="mt-5">
        <p
          id={servicioId}
          className="text-muted-foreground text-xs tracking-widest uppercase"
        >
          {proyecto.servicio}
        </p>
        <h3 className="mt-2 flex items-center gap-2 text-2xl">
          {/* Enlace estirado, mismo patron que Servicios: toda la card clicable
              sin anidarla en un <a>. El nombre accesible sale del eyebrow mas
              el nombre visible, asi contiene el texto visible (WCAG 2.5.3). */}
          <Link
            href={rutaProyecto(proyecto)}
            aria-labelledby={`${servicioId} ${nombreId}`}
            className="after:absolute after:inset-0"
          >
            <span id={nombreId}>{proyecto.nombre}</span>
          </Link>
          <ArrowRight
            aria-hidden
            className="size-5 transition-transform group-hover:translate-x-1"
          />
        </h3>
      </div>
    </article>
  );
}

export function Portafolio() {
  const reduceMotion = useReducedMotion();
  const uid = useId();

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
    <section
      id="portafolio"
      aria-labelledby={`${uid}-titulo`}
      className="mx-auto w-full max-w-site py-16 lg:py-24"
    >
      <Container>
        {/* TODO(copy): eyebrow, titulo y texto del CTA pendientes. */}
        <div className="max-w-3xl">
          <p className="text-muted-foreground text-sm tracking-widest uppercase">
            Portafolio
          </p>
          <h2 id={`${uid}-titulo`} className="mt-3 text-3xl lg:text-5xl">
            Proyectos
          </h2>
          <Link
            href="/portafolio"
            className="group/cta mt-6 inline-flex items-center gap-2"
          >
            Explorar Portafolio
            <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-1" />
          </Link>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.1 } },
            hidden: {},
          }}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6"
        >
          {portafolioHome.map((proyecto, i) => (
            <motion.div
              key={proyecto.slug}
              variants={item}
              className={SPANS[i]}
            >
              <Card proyecto={proyecto} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
