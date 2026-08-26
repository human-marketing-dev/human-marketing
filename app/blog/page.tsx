import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos sobre marketing digital, prospección comercial, SEO y generación de leads para empresas B2B, industriales e inmobiliarias.",
};

export default function BlogPage() {
  return (
    <Container>
      <div className="py-16 lg:py-24">
        <h1 className="text-4xl lg:text-6xl">Blog</h1>
        {/* TODO(copy): listado de entradas y su fuente de contenido. */}
      </div>
    </Container>
  );
}
