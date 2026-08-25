import { Container } from "@/components/layout/Container";

// TODO: generateMetadata y generateStaticParams a partir de la fuente de servicios

export default async function ServicioPage({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;

  return (
    <Container>
      <h1 className="py-16 text-4xl lg:py-24 lg:text-6xl">{slug}</h1>
      {/* TODO: contenido del servicio */}
    </Container>
  );
}
