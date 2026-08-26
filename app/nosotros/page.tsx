import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce al equipo de Human Marketing, agencia de marketing digital en Monterrey especializada en prospección comercial B2B, industrial e inmobiliaria.",
};

export default function NosotrosPage() {
  return (
    <Container>
      <div className="py-16 lg:py-24">
        <h1 className="text-4xl lg:text-6xl">Nosotros</h1>
        {/* TODO(copy): historia, equipo, metodología y diferenciadores. */}
      </div>
    </Container>
  );
}
