"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useActionState, useEffect, useId, useRef } from "react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMediaQuery } from "@/hooks/use-media-query";
import { submitLead } from "@/app/actions/lead";
import { leadInitialState, type LeadField } from "@/lib/lead";
import { cn } from "@/lib/utils";

// Constante de modulo: como literal en las props cambiaria de referencia en
// cada render y reconstruiria el contexto WebGL en cada tecleo del formulario.
const FERROFLUID_COLORS = ["#1e28c8", "#6e1eaa", "#dc015b", "#fa505b", "#ffd93c"];

// ssr:false para que `ogl` no entre al bundle inicial.
const Ferrofluid = dynamic(() => import("@/components/ui/ferrofluid"), {
  ssr: false,
});

/**
 * Fondo de reemplazo cuando el shader no se monta (movil o reduced-motion).
 * TODO(fondo): sustituir por un WebP con un frame capturado del shader. Basta
 * cambiar este div por un <Image fill … /> con la misma capa oscura encima.
 */
function FondoEstatico() {
  return (
    <div
      className="h-full w-full"
      style={{
        backgroundImage: [
          "radial-gradient(60% 60% at 20% 15%, #1e28c855 0%, transparent 70%)",
          "radial-gradient(55% 55% at 80% 25%, #6e1eaa4d 0%, transparent 70%)",
          "radial-gradient(50% 50% at 65% 85%, #dc015b40 0%, transparent 70%)",
          "radial-gradient(45% 45% at 15% 80%, #fa505b33 0%, transparent 70%)",
          "radial-gradient(35% 35% at 50% 50%, #ffd93c1f 0%, transparent 70%)",
        ].join(", "),
      }}
    />
  );
}

// Orden visual de los campos: define cual es "el primero invalido".
const ORDEN_CAMPOS: LeadField[] = [
  "nombre",
  "compania",
  "correo",
  "telefono",
  "mensaje",
];

const inputClass =
  "border-white/20 bg-white/10 text-white placeholder:text-white/50 focus-visible:border-white/40 focus-visible:ring-white/20";

type LeadFormProps = {
  titulo?: string;
  texto?: string;
  /** Frase final en blanco bajo el texto. */
  cierre?: string;
};

export function LeadForm({
  titulo = "¿Necesitas una Agencia de Marketing Digital?",
  texto = "En Human Marketing estamos listos para ayudarte a estructurar, optimizar y potenciar tu prospección digital. Contamos con la metodología, la experiencia y las herramientas necesarias para convertir tu presencia en línea en un motor real de oportunidades comerciales.",
  cierre = "Demos juntos el siguiente paso.",
}: LeadFormProps = {}) {
  const [state, formAction, pending] = useActionState(
    submitLead,
    leadInitialState,
  );
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);

  // El form se remonta por `key={state.token}` y el foco se pierde. Sin esto,
  // quien navega con teclado o lector de pantalla queda al inicio de la pagina
  // y tiene que retabular todo el formulario para saber que fallo.
  useEffect(() => {
    if (state.status !== "error" || !state.errors) return;
    const primero = ORDEN_CAMPOS.find((campo) => state.errors?.[campo]);
    if (!primero) return;
    formRef.current
      ?.querySelector<HTMLInputElement | HTMLTextAreaElement>(
        `[name="${primero}"]`,
      )
      ?.focus();
  }, [state]);

  const esDesktop = useMediaQuery("(min-width: 768px)");
  const menosMovimiento = useMediaQuery("(prefers-reduced-motion: reduce)");
  // No se esconde con CSS: si se montara, el loop correria invisible.
  const conShader = esDesktop && !menosMovimiento;

  const campo = (name: LeadField) => {
    const error = state.errors?.[name];
    return {
      id: `${uid}-${name}`,
      errorId: `${uid}-${name}-error`,
      error,
      props: {
        id: `${uid}-${name}`,
        name,
        defaultValue: state.values?.[name] ?? "",
        "aria-invalid": error ? (true as const) : undefined,
        "aria-describedby": error ? `${uid}-${name}-error` : undefined,
      },
    };
  };

  const hayErroresDeCampo = Object.keys(state.errors ?? {}).length > 0;

  const nombre = campo("nombre");
  const compania = campo("compania");
  const correo = campo("correo");
  const telefono = campo("telefono");
  const mensaje = campo("mensaje");

  return (
    <section
      id="contacto"
      aria-labelledby={`${uid}-titulo`}
      className="relative overflow-hidden bg-surface-dark"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {conShader ? (
          <Ferrofluid
            colors={FERROFLUID_COLORS}
            speed={0.3}
            glow={2.6}
            mouseInteraction={false}
          />
        ) : (
          <FondoEstatico />
        )}
        {/* Garantiza el contraste del texto sobre cualquier frame del shader. */}
        <div className="absolute inset-0 bg-surface-dark/60" />
      </div>

      <Container>
        <div className="relative grid grid-cols-1 gap-12 py-20 lg:grid-cols-3 lg:py-28">
          <div className="text-white lg:col-span-1">
            <h2 id={`${uid}-titulo`} className="text-3xl lg:text-4xl">
              {titulo}
            </h2>
            <p className="mt-6 leading-relaxed text-white/70">
              {texto}
            </p>
            <p className="mt-6 text-lg text-white">
              {cierre}
            </p>
          </div>

          <form
            ref={formRef}
            // El token cambia en cada envio: remonta el form para que los
            // defaultValue repueblen los campos que React acaba de limpiar.
            key={state.token}
            action={formAction}
            noValidate
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2"
          >
            {/* Honeypot: fuera de pantalla y fuera del orden de tabulación. */}
            <div
              aria-hidden
              className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden"
            >
              <label htmlFor={`${uid}-sitio-web`}>No llenar</label>
              <input
                id={`${uid}-sitio-web`}
                name="sitio-web"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div>
              <Label htmlFor={nombre.id} className="text-white">
                Nombre
              </Label>
              <Input
                {...nombre.props}
                autoComplete="name"
                className={cn(inputClass, "mt-2")}
              />
              {nombre.error ? (
                <p id={nombre.errorId} className="mt-1.5 inline-block rounded-sm bg-black/80 px-2 py-1 text-sm text-[#fa505b]">
                  {nombre.error}
                </p>
              ) : null}
            </div>

            <div>
              <Label htmlFor={compania.id} className="text-white">
                Compañía <span className="text-white/50">(opcional)</span>
              </Label>
              <Input
                {...compania.props}
                autoComplete="organization"
                className={cn(inputClass, "mt-2")}
              />
              {compania.error ? (
                <p id={compania.errorId} className="mt-1.5 inline-block rounded-sm bg-black/80 px-2 py-1 text-sm text-[#fa505b]">
                  {compania.error}
                </p>
              ) : null}
            </div>

            <div>
              <Label htmlFor={correo.id} className="text-white">
                Correo
              </Label>
              <Input
                {...correo.props}
                type="email"
                autoComplete="email"
                className={cn(inputClass, "mt-2")}
              />
              {correo.error ? (
                <p id={correo.errorId} className="mt-1.5 inline-block rounded-sm bg-black/80 px-2 py-1 text-sm text-[#fa505b]">
                  {correo.error}
                </p>
              ) : null}
            </div>

            <div>
              <Label htmlFor={telefono.id} className="text-white">
                Teléfono <span className="text-white/50">(opcional)</span>
              </Label>
              <Input
                {...telefono.props}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className={cn(inputClass, "mt-2")}
              />
              {telefono.error ? (
                <p id={telefono.errorId} className="mt-1.5 inline-block rounded-sm bg-black/80 px-2 py-1 text-sm text-[#fa505b]">
                  {telefono.error}
                </p>
              ) : null}
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor={mensaje.id} className="text-white">
                Mensaje
              </Label>
              <Textarea
                {...mensaje.props}
                rows={5}
                className={cn(inputClass, "mt-2")}
              />
              {mensaje.error ? (
                <p id={mensaje.errorId} className="mt-1.5 inline-block rounded-sm bg-black/80 px-2 py-1 text-sm text-[#fa505b]">
                  {mensaje.error}
                </p>
              ) : null}
            </div>

            <div className="sm:col-span-2">
              <Button
                type="submit"
                size="lg"
                disabled={pending}
                className="h-12 w-full bg-white px-8 text-surface-dark hover:bg-white/85 sm:w-auto"
              >
                {pending ? "Enviando…" : "Enviar"}
              </Button>

              {/* El aviso lo pide en su punto 7: tiene que estar visible
                  donde se recaban los datos, no solo en el footer. */}
              <p className="mt-4 text-sm text-white/60">
                Al enviar aceptas nuestro{" "}
                <Link
                  href="/aviso-de-privacidad"
                  className="text-white underline underline-offset-4"
                >
                  Aviso de Privacidad
                </Link>
                .
              </p>

              {/* Con errores de campo a la vista este mensaje es redundante:
                  se oculta visualmente pero aria-live lo sigue anunciando. */}
              <p
                aria-live="polite"
                role="status"
                className={cn("mt-4", hayErroresDeCampo && "sr-only")}
              >
                {state.status !== "idle" ? (
                  <span
                    className={cn(
                      "inline-block rounded-sm bg-black/80 px-2 py-1 text-sm",
                      state.status === "error"
                        ? "text-[#fa505b]"
                        : "text-white",
                    )}
                  >
                    {state.message}
                  </span>
                ) : null}
              </p>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
