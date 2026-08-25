import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Padding horizontal consistente dentro del lienzo de 1450px.
 * El ancho maximo ya lo impone el shell en app/layout.tsx.
 */
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`w-full px-6 md:px-10 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}
