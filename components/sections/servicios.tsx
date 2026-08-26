"use client";

import Image from "next/image";
import Link from "next/link";
import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { servicios, type Servicio } from "@/lib/servicios";
import { cn } from "@/lib/utils";

// Fila 1: dos cards de 3 columnas. Fila 2: tres de 2.
const SPANS = [
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
];

// Esquinas exteriores del bloque en grande, interiores normales: el conjunto
// se lee como una sola pieza. Solo aplica en lg, donde existe el bento.
const ESQUINAS = [
  "lg:rounded-tl-3xl",
  "lg:rounded-tr-3xl",
  "lg:rounded-bl-3xl",
  "",
  "lg:rounded-br-3xl",
];

function Card({ servicio, esquina }: { servicio: Servicio; esquina: string }) {
  const uid = useId();
  const tituloId = `${uid}-titulo`;
  const ctaId = `${uid}-cta`;

  return (
    <article
      className={cn(
        "group border-border relative flex w-full flex-col justify-between overflow-hidden rounded-3xl border bg-surface-dark p-8 lg:rounded-lg",
        esquina,
      )}
    >
      {/* Campo de color: orbe fuera de la esquina superior izquierda. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full opacity-40 blur-3xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-70"
        style={{ backgroundColor: servicio.color }}
      />
      {/* Icono de marca saliendo por la esquina opuesta al orbe.
          Los offsets compensan el relleno transparente del webp (23% a la
          derecha, 12% abajo); sin eso la mano se queda dentro de la card.
          Opacidad mas baja que la de un icono de trazo: tiene mas masa. */}
      <Image
        src={servicio.icono.src}
        alt=""
        aria-hidden
        width={servicio.icono.width}
        height={servicio.icono.height}
        sizes="320px"
        className="pointer-events-none absolute -right-32 -bottom-20 h-72 w-auto opacity-[0.05] transition-opacity duration-500 group-hover:opacity-[0.09]"
      />

      <div className="relative">
        <h3 id={tituloId} className="text-2xl text-white lg:text-3xl">
          {servicio.titulo}
        </h3>
        <p className="mt-4 leading-relaxed text-white/70">
          {servicio.descripcion}
        </p>
      </div>

      <div className="relative mt-8">
        {/* Enlace estirado: `after:inset-0` hace clicable toda la card sin
            anidarla dentro de un <a> ni tapar el texto con una capa.
            El nombre accesible sale del CTA visible mas el titulo, para que
            contenga el texto visible (WCAG 2.5.3) y siga diciendo el destino. */}
        <Link
          href={servicio.href}
          aria-labelledby={`${ctaId} ${tituloId}`}
          className="group/cta inline-flex items-center gap-2 text-white after:absolute after:inset-0"
        >
          <span id={ctaId}>Explorar servicio</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export function Servicios() {
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
      id="servicios"
      aria-labelledby={`${uid}-titulo`}
      className="mx-auto w-full max-w-site py-16 lg:py-24"
    >
      <Container>
        <div className="max-w-3xl">
          <p className="text-muted-foreground text-sm tracking-widest uppercase">
            Nuestros Servicios
          </p>
          <h2 id={`${uid}-titulo`} className="mt-3 text-3xl lg:text-5xl">
            Soluciones integrales de marketing digital
          </h2>
          <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
            En Human Marketing diseñamos estrategias enfocadas en generar
            oportunidades comerciales reales: atraer prospectos, calificarlos
            mejor y convertirlos en ventas. Nuestros servicios trabajan como un
            sistema completo que impulsa el rendimiento de tus campañas, tu sitio
            web y tu equipo comercial.
          </p>
          {/* TODO(cta): el enlace original apuntaba a `#`. Confirmar destino. */}
          <Link
            href="/servicios"
            className="group/cta mt-6 inline-flex items-center gap-2"
          >
            Explorar Servicios
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
          className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-6 lg:grid-rows-2"
        >
          {servicios.map((servicio, i) => (
            <motion.div
              key={servicio.href}
              variants={item}
              className={cn("flex", SPANS[i])}
            >
              <Card servicio={servicio} esquina={ESQUINAS[i]} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
