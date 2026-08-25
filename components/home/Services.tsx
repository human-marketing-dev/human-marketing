import { Container } from "@/components/layout/Container";

/**
 * Home / Nuestros Servicios
 * Listado de servicios con enlace a /servicios/[slug]. Pendiente: nombres, descripciones y slugs.
 */
export function Services() {
  return (
    <section
      id="servicios"
      aria-labelledby="servicios-titulo"
      className="border-b border-tinta/10 py-16 lg:py-24"
    >
      <Container>
        <h2 id="servicios-titulo" className="text-3xl lg:text-5xl">
          Nuestros servicios
        </h2>
        {/* TODO: contenido pendiente */}
      </Container>
    </section>
  );
}
