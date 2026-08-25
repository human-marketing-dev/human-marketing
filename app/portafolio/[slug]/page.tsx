import { Container } from "@/components/layout/Container";

// TODO: generateMetadata y generateStaticParams a partir de la fuente de casos

export default async function CasoPage({ params }: PageProps<"/portafolio/[slug]">) {
  const { slug } = await params;

  return (
    <Container>
      <h1 className="py-16 text-4xl lg:py-24 lg:text-6xl">{slug}</h1>
      {/* TODO: contenido del caso */}
    </Container>
  );
}
