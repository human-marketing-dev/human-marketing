import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Impone el lienzo de 1450px y el padding horizontal consistente.
 * Es la unica fuente del ancho de contenido del sitio: quien quiera fondo a
 * sangre pone el fondo en su <section> y mete el contenido aqui dentro.
 */
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-site px-6 md:px-10 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}
