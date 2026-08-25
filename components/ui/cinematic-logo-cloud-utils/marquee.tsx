"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Segundos por vuelta completa. Más alto = más lento. */
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
}

export function Marquee({
  children,
  speed = 40,
  reverse = false,
  pauseOnHover = true,
  className,
  ...props
}: MarqueeProps) {
  return (
    <div
      className={cn("group flex w-full overflow-hidden", className)}
      {...props}
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          // La segunda copia existe solo para el loop visual.
          // aria-hidden evita que los lectores de pantalla lean cada logo dos veces.
          aria-hidden={copy === 1}
          className={cn(
            "flex shrink-0 items-center gap-x-10 pr-10 md:gap-x-14 md:pr-14",
            "animate-marquee motion-reduce:animate-none",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
          style={{ animationDuration: `${speed}s` }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

export default Marquee;
