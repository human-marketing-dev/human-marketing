"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState, type PointerEvent } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { ArrowRight, Plus } from "lucide-react";

import {
  CATEGORIAS,
  PORTAFOLIO_ASPECT,
  rutaProyecto,
  type Categoria,
  type Proyecto,
} from "@/lib/portafolio";
import { cn } from "@/lib/utils";

type Filtro = Categoria | "todos";

/** Dos filas de 3 en escritorio. Debajo de lg se esconden las 2 ultimas del lote. */
const POR_LOTE = 6;

const EASE = [0.16, 1, 0.3, 1] as const;

function Card({
  proyecto,
  prioridad,
}: {
  proyecto: Proyecto;
  prioridad: boolean;
}) {
  const uid = useId();
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  // Pastilla "Ver caso" que sigue al cursor sobre la imagen. Solo con mouse:
  // en touch no hay hover y el enlace estirado ya cubre la card.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  }

  return (
    <article className="group relative">
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerEnter={(e) => {
          if (e.pointerType !== "mouse") return;
          onMove(e);
          setHover(true);
        }}
        onPointerLeave={() => setHover(false)}
        className="relative overflow-hidden rounded-3xl bg-tinta/5"
        style={{ aspectRatio: PORTAFOLIO_ASPECT }}
      >
        <Image
          src={proyecto.portada.src}
          alt=""
          fill
          quality={82}
          priority={prioridad}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
        />
        <AnimatePresence>
          {hover && !reduceMotion && (
            <motion.span
              aria-hidden
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.25, ease: EASE }}
              style={{ left: sx, top: sy }}
              className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2"
            >
              <span className="flex items-center gap-2 rounded-full bg-white/90 px-5 py-3 text-sm text-tinta shadow-lg backdrop-blur">
                Ver caso
                <ArrowRight className="size-4" />
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <p
            id={`${uid}-servicio`}
            className="text-muted-foreground text-xs tracking-widest uppercase"
          >
            {proyecto.servicio}
          </p>
          <h2 className="mt-2 text-2xl">
            {/* Enlace estirado, mismo patron que Home/Portafolio. */}
            <Link
              href={rutaProyecto(proyecto)}
              aria-labelledby={`${uid}-servicio ${uid}-nombre`}
              className="after:absolute after:inset-0"
            >
              <span id={`${uid}-nombre`}>{proyecto.nombre}</span>
            </Link>
          </h2>
        </div>
        <span
          aria-hidden
          className="mt-1 flex size-11 shrink-0 items-center justify-center rounded-full border border-tinta/15 transition-colors duration-300 group-hover:border-tinta group-hover:bg-tinta group-hover:text-papel"
        >
          <ArrowRight className="size-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
        </span>
      </div>
    </article>
  );
}

export function GaleriaPortafolio({ proyectos }: { proyectos: Proyecto[] }) {
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const [lotes, setLotes] = useState(1);
  // Cuantas habia antes de "Ver mas", para escalonar solo las nuevas.
  const [previas, setPrevias] = useState(0);
  const reduceMotion = useReducedMotion();

  type Opcion = { id: Filtro; label: string; total: number };
  const opciones: Opcion[] = [
    { id: "todos", label: "Todos", total: proyectos.length } as Opcion,
    ...(Object.keys(CATEGORIAS) as Categoria[]).map((id): Opcion => ({
      id,
      label: CATEGORIAS[id],
      total: proyectos.filter((p) => p.categorias.includes(id)).length,
    })),
  ].filter((o) => o.total > 0);

  const filtrados =
    filtro === "todos"
      ? proyectos
      : proyectos.filter((p) => p.categorias.includes(filtro));
  const limite = lotes * POR_LOTE;
  const visibles = filtrados.slice(0, limite);
  const restantes = filtrados.length - limite;
  // Debajo de lg el lote es de 4: las 2 ultimas del lote se ocultan con CSS
  // mientras quede algo por mostrar (asi no hace falta saber el ancho en JS).
  const ocultaEnChico = (i: number) => restantes > 0 && i >= limite - 2;

  return (
    <LayoutGroup>
      <div
        role="group"
        aria-label="Filtrar proyectos"
        className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 md:mx-0 md:flex-wrap md:px-0"
      >
        {opciones.map((o) => {
          const activo = filtro === o.id;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={activo}
              onClick={() => {
                setFiltro(o.id);
                setLotes(1);
                setPrevias(0);
              }}
              className={cn(
                "relative shrink-0 rounded-full border px-5 py-2.5 text-sm transition-colors",
                activo
                  ? "border-tinta text-papel"
                  : "border-tinta/15 text-tinta hover:border-tinta/40",
              )}
            >
              {activo && (
                <motion.span
                  layoutId="filtro-activo"
                  aria-hidden
                  className="absolute inset-0 -z-10 rounded-full bg-tinta"
                  transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative">
                {o.label}
                <span className={cn("ml-2 tabular-nums", activo ? "text-papel/60" : "text-tinta/40")}>
                  {o.total}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {visibles.length} de {filtrados.length} proyectos
      </p>

      <motion.ul
        layout={!reduceMotion}
        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visibles.map((proyecto, i) => (
            <motion.li
              key={proyecto.slug}
              layout={!reduceMotion}
              initial={reduceMotion ? false : { opacity: 0, y: 24, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, filter: "blur(8px)" }}
              transition={{
                duration: reduceMotion ? 0 : 0.6,
                ease: EASE,
                delay: reduceMotion || i < previas ? 0 : (i - previas) * 0.07,
              }}
              className={cn(ocultaEnChico(i) && "max-lg:hidden")}
            >
              <Card proyecto={proyecto} prioridad={i < 3} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence initial={false}>
        {restantes > 0 && (
          <motion.div
            layout={!reduceMotion}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="mt-14 flex justify-center"
          >
            <button
              type="button"
              onClick={() => {
                setPrevias(visibles.length);
                setLotes((n) => n + 1);
              }}
              className="group/mas inline-flex items-center gap-3 rounded-full border border-tinta/15 py-2 pr-2 pl-6 transition-colors hover:border-tinta"
            >
              Ver más proyectos
              {/* Debajo de lg hay 2 ocultas de mas (ver ocultaEnChico). */}
              <span className="text-tinta/40 tabular-nums lg:hidden">{restantes + 2}</span>
              <span className="text-tinta/40 tabular-nums max-lg:hidden">{restantes}</span>
              <span className="flex size-9 items-center justify-center rounded-full bg-tinta text-papel transition-transform duration-300 group-hover/mas:rotate-90">
                <Plus className="size-4" />
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
