"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Send, X } from "lucide-react";

import { WhatsAppIcon } from "@/components/ui/social-icons";
import { contacto } from "@/lib/site";

const VERDE_WHATSAPP = "#25D366";
const MENSAJE_INICIAL = "Hola, me interesa conocer más sobre sus servicios.";

/**
 * Boton flotante de WhatsApp. Primer click abre un mini chat (no modal, no
 * bloquea la pagina); el segundo, en "Abrir WhatsApp", manda a wa.me con el
 * mensaje que la persona haya escrito ya precargado.
 */
export function WhatsAppFlotante() {
  const [abierto, setAbierto] = useState(false);
  const [mensaje, setMensaje] = useState(MENSAJE_INICIAL);
  const reduceMotion = useReducedMotion();
  const panelId = useId();
  const tituloId = `${panelId}-titulo`;
  const botonRef = useRef<HTMLButtonElement>(null);
  const textoRef = useRef<HTMLTextAreaElement>(null);
  const cerrarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!abierto) return;
    // En touch, enfocar el textarea abre el teclado y tapa el panel: ahi el
    // foco va al boton de cerrar, que igual queda dentro del dialogo.
    if (window.matchMedia("(pointer: fine)").matches) textoRef.current?.focus();
    else cerrarRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAbierto(false);
        botonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [abierto]);

  const texto = mensaje.trim() || MENSAJE_INICIAL;
  const href = `https://wa.me/${contacto.whatsapp}?text=${encodeURIComponent(texto)}`;

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 lg:right-6 lg:bottom-6">
      <AnimatePresence>
        {abierto && (
          <motion.div
            id={panelId}
            role="dialog"
            aria-labelledby={tituloId}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "bottom right" }}
            className="w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-tinta/10 bg-papel shadow-2xl"
          >
            <div className="flex items-center gap-3 bg-surface-dark px-5 py-4 text-white">
              <span className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-white">
                <Image
                  src="/icon/human-marketing-face-icon-black.webp"
                  alt=""
                  width={719}
                  height={594}
                  sizes="40px"
                  className="h-6 w-auto"
                />
                <span
                  aria-hidden
                  className="absolute right-0 bottom-0 size-2.5 rounded-full ring-2 ring-surface-dark"
                  style={{ backgroundColor: VERDE_WHATSAPP }}
                />
              </span>
              <div className="flex-1">
                <p id={tituloId}>Human Marketing</p>
                <p className="text-sm text-white/60">Escríbenos por WhatsApp</p>
              </div>
              <button
                ref={cerrarRef}
                type="button"
                onClick={() => {
                  setAbierto(false);
                  botonRef.current?.focus();
                }}
                aria-label="Cerrar chat"
                className="rounded-full p-1 text-white/70 transition-colors hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="bg-tinta/[0.03] px-5 py-6">
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-papel px-4 py-3 text-sm leading-relaxed shadow-sm">
                ¡Hola! 👋 ¿En qué te podemos ayudar? Cuéntanos de tu proyecto y
                te respondemos por WhatsApp.
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-tinta/10 p-4">
              <label htmlFor={`${panelId}-mensaje`} className="sr-only">
                Tu mensaje
              </label>
              <textarea
                ref={textoRef}
                id={`${panelId}-mensaje`}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                rows={3}
                maxLength={500}
                className="w-full resize-none rounded-2xl border border-tinta/15 bg-papel px-4 py-3 text-base leading-relaxed outline-none md:text-sm focus-visible:border-tinta/40"
              />
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: VERDE_WHATSAPP }}
              >
                <WhatsAppIcon className="size-5" />
                Abrir WhatsApp
                <Send className="size-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={botonRef}
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        aria-controls={abierto ? panelId : undefined}
        aria-label={abierto ? "Cerrar chat de WhatsApp" : "Abrir chat de WhatsApp"}
        className="flex size-14 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105"
        style={{ backgroundColor: VERDE_WHATSAPP }}
      >
        {abierto ? <X className="size-7" /> : <WhatsAppIcon className="size-7" />}
      </button>
    </div>
  );
}
