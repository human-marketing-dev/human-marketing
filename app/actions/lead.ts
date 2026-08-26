"use server";

import { z } from "zod";

import type { LeadField, LeadState } from "@/lib/lead";

// Formato laxo a proposito: acepta 10 digitos, con o sin +52, y con espacios,
// guiones o parentesis. Rechazar de mas en un telefono opcional pierde leads.
const TELEFONO_MX = /^(\+?52[\s-]?)?(?:\(?\d{2,3}\)?[\s-]?)?\d{3,4}[\s-]?\d{4}$/;

const leadSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "Escribe tu nombre.")
    .max(80, "El nombre es demasiado largo."),
  compania: z.string().trim().max(120, "El nombre es demasiado largo.").optional(),
  correo: z.email("Escribe un correo electrónico válido."),
  telefono: z
    .string()
    .trim()
    .regex(TELEFONO_MX, "Escribe un teléfono válido a 10 dígitos.")
    .optional(),
  mensaje: z
    .string()
    .trim()
    .min(10, "Cuéntanos un poco más, mínimo 10 caracteres.")
    .max(2000, "El mensaje es demasiado largo."),
});

/** Los campos opcionales llegan como "" desde FormData; eso no es un valor. */
function opcional(value: FormDataEntryValue | null) {
  const s = typeof value === "string" ? value.trim() : "";
  return s === "" ? undefined : s;
}

export async function submitLead(
  prev: LeadState,
  formData: FormData,
): Promise<LeadState> {
  const token = prev.token + 1;
  const values = {
    nombre: String(formData.get("nombre") ?? ""),
    compania: String(formData.get("compania") ?? ""),
    correo: String(formData.get("correo") ?? ""),
    telefono: String(formData.get("telefono") ?? ""),
    mensaje: String(formData.get("mensaje") ?? ""),
  };
  // Honeypot: campo invisible para personas, irresistible para bots.
  // Si viene con algo, se descarta en silencio fingiendo exito.
  if (opcional(formData.get("sitio-web")) !== undefined) {
    return { status: "success", message: "Gracias, te contactamos pronto.", token };
  }

  const parsed = leadSchema.safeParse({
    nombre: String(formData.get("nombre") ?? ""),
    compania: opcional(formData.get("compania")),
    correo: String(formData.get("correo") ?? "").trim(),
    telefono: opcional(formData.get("telefono")),
    mensaje: String(formData.get("mensaje") ?? ""),
  });

  if (!parsed.success) {
    const errors: LeadState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as LeadField;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    // `values` de vuelta para no perder lo tecleado al repintar.
    return {
      status: "error",
      message: "Revisa los campos marcados.",
      errors,
      values,
      token,
    };
  }

  // TODO(endpoint): definir destino de los leads (correo, CRM o webhook) y
  // enviar `parsed.data` ahí. Por ahora solo valida y responde éxito.
  // Sin `values`: en exito el formulario se limpia.
  return {
    status: "success",
    message: "Gracias, recibimos tu mensaje. Te contactamos pronto.",
    token,
  };
}
