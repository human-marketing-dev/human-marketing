"use client";

import { Accordion } from "radix-ui";
import { Plus } from "lucide-react";

import type { Pregunta } from "@/lib/servicios-detalle";

/**
 * Acordeon de FAQs. Radix deja el contenido cerrado montado en el HTML
 * (hidden), asi que las respuestas siguen siendo rastreables; ademas van en el
 * schema FAQPage de la pagina.
 */
export function PreguntasFrecuentes({ preguntas }: { preguntas: Pregunta[] }) {
  return (
    <Accordion.Root type="single" collapsible className="border-t border-tinta/15">
      {preguntas.map((p, i) => (
        <Accordion.Item key={p.pregunta} value={`faq-${i}`} className="border-b border-tinta/15">
          <Accordion.Header asChild>
            <h3>
              <Accordion.Trigger className="group flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left text-lg lg:text-xl">
                {p.pregunta}
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-tinta/15 transition-colors duration-300 group-hover:border-tinta group-data-[state=open]:border-tinta group-data-[state=open]:bg-tinta group-data-[state=open]:text-papel">
                  <Plus className="size-4 transition-transform duration-300 group-data-[state=open]:rotate-45" />
                </span>
              </Accordion.Trigger>
            </h3>
          </Accordion.Header>
          <Accordion.Content
            forceMount
            className="overflow-hidden data-[state=closed]:hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
          >
            <p className="text-muted-foreground max-w-3xl pb-6 text-lg leading-relaxed">
              {p.respuesta}
            </p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
