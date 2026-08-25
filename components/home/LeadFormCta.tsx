import { Container } from "@/components/layout/Container";

/**
 * Home / Lead Form CTA
 * Formulario de captacion. Pendiente: campos, destino (email, CRM) y texto de privacidad.
 */
export function LeadFormCta() {
  return (
    <section
      id="contacto"
      aria-labelledby="contacto-titulo"
      className="border-b border-tinta/10 py-16 lg:py-24"
    >
      <Container>
        <h2 id="contacto-titulo" className="text-3xl lg:text-5xl">
          Hablemos
        </h2>
        {/* TODO: contenido pendiente */}
      </Container>
    </section>
  );
}
