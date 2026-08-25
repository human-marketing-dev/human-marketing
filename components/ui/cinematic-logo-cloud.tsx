"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Marquee } from "@/components/ui/cinematic-logo-cloud-utils/marquee";
import { cn } from "@/lib/utils";

export type LogoCloudClient = {
  name: string;
  src: string;
  width: number;
  height: number;
  className?: string;
  invertDark?: boolean;
};

export interface CinematicLogoCloudProps {
  clients: LogoCloudClient[];
  className?: string;
  eyebrow?: string;
  variant?: "grid" | "marquee";
  rows?: number;
}

function ClientLogo({ client }: { client: LogoCloudClient }) {
  return (
    <Image
      src={client.src}
      alt={client.name}
      width={client.width}
      height={client.height}
      loading="lazy"
      sizes="(min-width: 768px) 160px, 128px"
      className={cn(
        "h-8 w-auto max-w-[10rem] object-contain md:h-10",
        client.invertDark && "dark:invert",
        client.className,
      )}
    />
  );
}

export function CinematicLogoCloud({
  clients,
  className,
  eyebrow = "NUESTROS CLIENTES",
  variant = "marquee",
  rows = 2,
}: CinematicLogoCloudProps) {
  const reduceMotion = useReducedMotion();

  // Reparto round-robin: cliente 0 -> fila 0, cliente 1 -> fila 1, cliente 2 -> fila 0...
  // Partir el array a la mitad agruparia los logos anchos en la misma fila.
  const lanes = React.useMemo(() => {
    const n = Math.max(1, rows);
    const out: LogoCloudClient[][] = Array.from({ length: n }, () => []);
    clients.forEach((c, i) => out[i % n].push(c));
    return out.filter((lane) => lane.length > 0);
  }, [clients, rows]);

  return (
    <div className={cn("bg-muted/40 w-full py-12 md:py-16", className)}>
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-muted-foreground px-4 text-xs tracking-widest uppercase sm:px-6 lg:px-8">
          {eyebrow}
        </h2>

        {variant === "marquee" ? (
          <div className="mt-10 flex flex-col gap-y-8 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            {lanes.map((lane, i) => (
              <Marquee
                key={i}
                speed={45 + i * 10}
                reverse={i % 2 === 1}
                aria-label={i === 0 ? "Logotipos de nuestros clientes" : undefined}
              >
                {lane.map((client) => (
                  <div
                    key={client.name}
                    className="flex shrink-0 items-center justify-center"
                  >
                    <ClientLogo client={client} />
                  </div>
                ))}
              </Marquee>
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.1 } },
              hidden: {},
            }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 px-4 sm:px-6 md:gap-x-14 lg:px-8"
          >
            {clients.map((client) => (
              <motion.div
                key={client.name}
                variants={
                  reduceMotion
                    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
                    : {
                        hidden: { opacity: 0, y: 20, filter: "blur(12px)" },
                        visible: {
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                          transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                        },
                      }
                }
                className="flex items-center justify-center"
              >
                <ClientLogo client={client} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default CinematicLogoCloud;
