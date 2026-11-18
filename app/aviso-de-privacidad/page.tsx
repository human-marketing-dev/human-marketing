import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { contacto } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aviso de Privacidad",
  description:
    "Aviso de privacidad de Human Marketing: qué datos personales recabamos, para qué los usamos y cómo ejercer tus derechos ARCO.",
};

const CORREO = contacto.correo;

function Correo() {
  return (
    <a href={`mailto:${CORREO}`} className="underline underline-offset-4">
      {CORREO}
    </a>
  );
}

export default function AvisoDePrivacidadPage() {
  return (
    <Container>
      <article className="max-w-prose py-16 lg:py-24">
        <h1 className="text-4xl lg:text-5xl">Aviso de Privacidad</h1>

        <p className="mt-8 leading-relaxed">
          Human Marketing, con domicilio en Río Amazonas 16, Roma, Distrito Tec,
          64700 Monterrey, N.L., es responsable del uso y protección de sus datos
          personales, y al respecto le informamos lo siguiente:
        </p>

        <h2 className="mt-12 text-2xl">
          1. Datos personales que recabamos
        </h2>
        <p className="mt-4 leading-relaxed">
          Los datos personales que podemos recabar de forma directa a través de
          nuestro sitio web, formularios de contacto, correo electrónico o medios
          digitales incluyen:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed">
          <li>Nombre completo</li>
          <li>Correo electrónico</li>
          <li>Número telefónico</li>
          <li>Empresa o razón social</li>
          <li>
            Información relacionada con proyectos, servicios o requerimientos
            comerciales
          </li>
        </ul>
        <p className="mt-4 leading-relaxed">
          No recabamos datos personales sensibles.
        </p>

        <h2 className="mt-12 text-2xl">
          2. Finalidades del tratamiento de los datos
        </h2>
        <p className="mt-4 leading-relaxed">
          Los datos personales que recabamos serán utilizados para las siguientes
          finalidades primarias:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed">
          <li>Atender solicitudes de información, contacto o cotización</li>
          <li>Brindar información sobre nuestros servicios</li>
          <li>
            Dar seguimiento a proyectos, propuestas o relaciones comerciales
          </li>
          <li>
            Contactarlo para fines relacionados con los servicios solicitados
          </li>
        </ul>
        <p className="mt-4 leading-relaxed">
          De manera adicional, podremos utilizar su información para fines
          secundarios como:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed">
          <li>
            Envío de información comercial, promociones o contenido relacionado
            con marketing
          </li>
        </ul>
        <p className="mt-4 leading-relaxed">
          Si no desea que sus datos se utilicen para estas finalidades
          secundarias, puede manifestarlo enviando un correo a: <Correo />
        </p>

        <h2 className="mt-12 text-2xl">
          3. Transferencia de datos personales
        </h2>
        <p className="mt-4 leading-relaxed">
          Human Marketing no transfiere sus datos personales a terceros sin su
          consentimiento, salvo aquellas excepciones previstas por la ley.
        </p>

        <h2 className="mt-12 text-2xl">4. Derechos ARCO</h2>
        <p className="mt-4 leading-relaxed">
          Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al uso
          de sus datos personales (derechos ARCO).
        </p>
        <p className="mt-4 leading-relaxed">
          Para ejercer estos derechos, deberá enviar una solicitud al correo
          electrónico: <Correo />
        </p>
        <p className="mt-4 leading-relaxed">La solicitud deberá incluir:</p>
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed">
          <li>Nombre del titular</li>
          <li>Medio para comunicar la respuesta</li>
          <li>Documentos que acrediten su identidad</li>
          <li>
            Descripción clara de los datos respecto de los que se busca ejercer
            algún derecho
          </li>
        </ul>

        <h2 className="mt-12 text-2xl">
          5. Uso de cookies y tecnologías de rastreo
        </h2>
        <p className="mt-4 leading-relaxed">
          Nuestro sitio web puede utilizar cookies y tecnologías similares para
          mejorar la experiencia del usuario y analizar el comportamiento de
          navegación. Estas cookies no recopilan información personal sensible.
        </p>
        <p className="mt-4 leading-relaxed">
          Usted puede deshabilitar el uso de cookies desde la configuración de su
          navegador.
        </p>

        <h2 className="mt-12 text-2xl">6. Cambios al aviso de privacidad</h2>
        <p className="mt-4 leading-relaxed">
          Human Marketing se reserva el derecho de modificar o actualizar el
          presente aviso de privacidad en cualquier momento. Cualquier cambio
          será publicado en este mismo sitio web.
        </p>

        <h2 className="mt-12 text-2xl">7. Consentimiento</h2>
        <p className="mt-4 leading-relaxed">
          Al proporcionar sus datos personales a través de este sitio web, usted
          reconoce haber leído y aceptado el presente Aviso de Privacidad.
        </p>

        <p className="text-muted-foreground mt-12 border-t pt-6 text-sm">
          Última actualización: 26 de agosto de 2026.
        </p>
      </article>
    </Container>
  );
}
