import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Servicios",
  // TODO: description
};

export default function ServiciosPage() {
  return (
    <Container>
      <h1 className="py-16 text-4xl lg:py-24 lg:text-6xl">Servicios</h1>
      {/* TODO: listado de servicios */}
    </Container>
  );
}
