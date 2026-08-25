import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Portafolio",
  // TODO: description
};

export default function PortafolioPage() {
  return (
    <Container>
      <h1 className="py-16 text-4xl lg:py-24 lg:text-6xl">Portafolio</h1>
      {/* TODO: listado de casos */}
    </Container>
  );
}
