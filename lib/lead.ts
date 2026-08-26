/**
 * Tipos y estado inicial del formulario de contacto.
 *
 * Viven aqui y no en app/actions/lead.ts porque un archivo "use server" solo
 * puede exportar funciones async: exportar el objeto de estado inicial desde
 * ahi revienta en runtime con "can only export async functions, found object".
 */
export type LeadField =
  | "nombre"
  | "compania"
  | "correo"
  | "telefono"
  | "mensaje";

export type LeadState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<LeadField, string>>;
  /**
   * React 19 resetea los campos no controlados al terminar una action. Sin
   * devolver lo tecleado, un correo mal escrito borraria tambien el mensaje.
   * El formulario se remonta con `token` y repuebla desde `values`.
   */
  values?: Partial<Record<LeadField, string>>;
  token: number;
};

export const leadInitialState: LeadState = { status: "idle", token: 0 };
