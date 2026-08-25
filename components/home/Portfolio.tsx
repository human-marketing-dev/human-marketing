import { Container } from "@/components/layout/Container";

/**
 * Home / Portafolio
 * Casos destacados con enlace a /portafolio/[slug]. Pendiente: proyectos e imagenes.
 */
export function Portfolio() {
  return (
    <section
      id="portafolio"
      aria-labelledby="portafolio-titulo"
      className="border-b border-tinta/10 py-16 lg:py-24"
    >
      <Container>
        <h2 id="portafolio-titulo" className="text-3xl lg:text-5xl">
          Portafolio
        </h2>
        {/* TODO: contenido pendiente */}
      </Container>
    </section>
  );
}
