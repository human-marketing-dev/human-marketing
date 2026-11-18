"use client";

import { Accordion } from "radix-ui";
import { Plus } from "lucide-react";

type Fila = { etiqueta: string; valor: string | string[] };

/**
 * Acordeon "Detalles del proyecto": cerrado de inicio, se abre con el "+",
 * que gira a "x". La altura anima con las variables de Radix.
 */
export function DetallesProyecto({ filas }: { filas: Fila[] }) {
  return (
    <Accordion.Root type="single" collapsible className="border-y border-tinta/15">
      <Accordion.Item value="detalles">
        <Accordion.Header>
          <Accordion.Trigger className="group flex w-full items-center justify-between gap-6 py-5 text-left text-lg">
            Detalles del proyecto
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-tinta/15 transition-colors duration-300 group-hover:border-tinta group-data-[state=open]:border-tinta group-data-[state=open]:bg-tinta group-data-[state=open]:text-papel">
              <Plus className="size-4 transition-transform duration-300 group-data-[state=open]:rotate-45" />
            </span>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <dl className="flex flex-col gap-5 pb-6">
            {filas.map((f) => (
              <div key={f.etiqueta} className="grid grid-cols-3 gap-4">
                <dt className="text-muted-foreground text-sm">{f.etiqueta}:</dt>
                <dd className="col-span-2">
                  {Array.isArray(f.valor) ? (
                    <ul className="flex flex-col gap-1">
                      {f.valor.map((v) => (
                        <li key={v}>{v}</li>
                      ))}
                    </ul>
                  ) : (
                    f.valor
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
