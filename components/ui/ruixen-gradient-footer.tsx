"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export type GradientStop = { color: string; offset: number };

/** Paleta Human, del piso hacia arriba, disolviendose en transparente. */
export const RUIXEN_STOPS: GradientStop[] = [
  { color: "#ffd93c", offset: 0 },
  { color: "#fa505b", offset: 0.28 },
  { color: "#dc015b", offset: 0.5 },
  { color: "#6e1eaa", offset: 0.72 },
  { color: "#1e28c8", offset: 0.88 },
  { color: "transparent", offset: 1 },
];

export interface RuixenGradientFooterProps {
  children: React.ReactNode;
  className?: string;
  stops?: GradientStop[];
  /** Fraccion visible cuando aun no se llega al final. 0 = invisible. */
  minReveal?: number;
  /** Columnas del degradado. */
  bars?: number;
  /** stdDeviation del feGaussianBlur que las funde. */
  blur?: number;
  /** Altura de la columna central, como fraccion del viewBox. */
  peak?: number;
  /** Altura de las columnas del borde, como fraccion de `peak`. */
  valley?: number;
}

const VBW = 1271;
const VBH = 599;

/** Caida suave de potencia: bordes cortos, centro alto. */
function bellHeights(n: number, peak: number, valley: number): number[] {
  const out: number[] = [];
  const mid = (n - 1) / 2;
  for (let i = 0; i < n; i++) {
    const t = mid === 0 ? 0 : Math.abs(i - mid) / mid; // 0 centro -> 1 borde
    const eased = 1 - Math.pow(t, 1.24);
    out.push(peak * VBH * (valley + (1 - valley) * eased));
  }
  return out;
}

/* ── Los dos numeros a ajustar ──────────────────────────────────────────────
 *
 * ALTO_BANDA controla el TAMANO VISUAL de la banda. El mismo valor va al
 * colchon inferior del footer para que coincidan exactamente y la banda nunca
 * suba por encima del contenido. Responsivo y no una prop: el 65vh del
 * original dejaba un hueco desproporcionado en movil.
 */
const ALTO_BANDA = "h-[14vh] md:h-[21vh]";

/*
 * La distancia del reveal NO es un valor aparte: se mide de la propia altura
 * de la banda. Como el colchon inferior mide lo mismo, el tope de la banda
 * coincide exactamente con el tope del colchon en todo el recorrido, asi que
 * por construccion nunca puede treparse sobre el contenido del footer.
 * Ademas queda responsivo solo, sin un vh que ajustar por breakpoint.
 */
/* ─────────────────────────────────────────────────────────────────────────── */

export function RuixenGradientFooter({
  children,
  className,
  stops = RUIXEN_STOPS,
  minReveal = 0,
  bars = 9,
  blur = 22,
  peak = 0.98,
  valley = 0.55,
}: RuixenGradientFooterProps) {
  const reduceMotion = useReducedMotion();
  // Los `:` de useId no son validos en un id de SVG.
  const uid = React.useId().replace(/:/g, "");
  const bandaRef = React.useRef<HTMLDivElement>(null);
  const rootRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    // Con movimiento reducido no se registra listener: la franja se queda
    // en una altura fija discreta (ver `style` de abajo).
    if (reduceMotion) return;

    const banda = bandaRef.current;
    if (!banda) return;

    let frame = 0;

    const medir = () => {
      frame = 0;
      const restante =
        document.documentElement.scrollHeight -
        (window.scrollY + window.innerHeight);
      // offsetHeight no lo altera el scaleY: sigue siendo la altura de layout.
      const distancia = Math.max(1, banda.offsetHeight);
      // 0 a una altura de banda del final, 1 al tocar el fondo del documento.
      const avance = Math.min(1, Math.max(0, 1 - restante / distancia));
      const revelado = minReveal + (1 - minReveal) * avance;
      // scaleY desde el piso, no translate: asi el degradado se ESTIRA en vez
      // de destaparse. Los colores se separan conforme crece; ese es el
      // acordeon. Con translate la banda solo subiria, sin deformarse.
      // Se escribe el transform directo sobre el nodo: pasar por useState
      // provocaria un render del subarbol completo en cada evento de scroll.
      banda.style.transform = `scaleY(${revelado})`;
    };

    const alScroll = () => {
      // Como maximo un calculo por frame.
      if (!frame) frame = requestAnimationFrame(medir);
    };

    medir();
    window.addEventListener("scroll", alScroll, { passive: true });
    window.addEventListener("resize", alScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", alScroll);
      window.removeEventListener("resize", alScroll);
    };
  }, [reduceMotion, minReveal]);

  const colW = VBW / bars;
  const alturas = bellHeights(bars, peak, valley);

  return (
    <footer ref={rootRef} className={cn("relative overflow-hidden", className)}>
      <div
        aria-hidden
        ref={bandaRef}
        className={cn(
          // `fixed`, no `absolute`: anclada al viewport es como el reveal se
          // ve mientras haces scroll. Anclada al footer solo se veria el
          // estado final, al tocar fondo. Requiere que ningun ancestro tenga
          // transform/filter/contain — verificado en app/layout.tsx.
          "pointer-events-none fixed inset-x-0 bottom-0",
          ALTO_BANDA,
        )}
        style={{
          transformOrigin: "bottom",
          // Con minReveal 0 arranca en scaleY(0): la banda no ocupa ni un
          // pixel antes del reveal, sin linea residual por redondeo.
          transform: reduceMotion ? "scaleY(0.18)" : `scaleY(${minReveal})`,
        }}
      >
        {/* Nueve columnas de distinta altura repartidas en campana, cada una
            con el degradado completo y desenfocadas encima. Ese borde superior
            irregular es la firma del efecto; una banda lisa no lo tiene.
            preserveAspectRatio="none" deforma el viewBox para llenar el ancho. */}
        <svg
          style={{ height: "100%", width: "100%", display: "block" }}
          viewBox={`0 0 ${VBW} ${VBH}`}
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient id={`grad-${uid}`} x1="0" y1="1" x2="0" y2="0">
              {stops.map((s, i) => (
                <stop key={i} offset={s.offset} stopColor={s.color} />
              ))}
            </linearGradient>
            <filter
              id={`blur-${uid}`}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation={blur} />
            </filter>
          </defs>
          {alturas.map((barH, i) => (
            <g key={i} filter={`url(#blur-${uid})`}>
              {/* El 23% de solape entre columnas es intencional: es lo que
                  las funde entre si al desenfocarlas. */}
              <rect
                x={i * colW}
                y={VBH - barH}
                width={colW * 1.23}
                height={barH}
                fill={`url(#grad-${uid})`}
              />
            </g>
          ))}
        </svg>
      </div>
      {/* El contenido va arriba de la zona donde crece el degradado. */}
      <div className="relative">{children}</div>
      <div aria-hidden className={ALTO_BANDA} />
    </footer>
  );
}

export default RuixenGradientFooter;
