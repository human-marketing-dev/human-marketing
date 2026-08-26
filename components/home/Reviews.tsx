import { Container } from "@/components/layout/Container";

/**
 * Home / Reseñas
 * Testimonios de clientes. Candidato a schema.org Review / AggregateRating.
 */
export function Reviews() {
  return (
    <section
      id="resenas"
      aria-labelledby="resenas-titulo"
      className="mx-auto w-full max-w-site border-b border-tinta/10 py-16 lg:py-24"
    >
      <Container>
        <h2 id="resenas-titulo" className="text-3xl lg:text-5xl">
          Reseñas
        </h2>
        {/* TODO: contenido pendiente */}
      </Container>
    </section>
  );
}
