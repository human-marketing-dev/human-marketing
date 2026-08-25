import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { mainNav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="w-full border-t border-tinta/10">
      <Container>
        <div className="flex flex-col gap-10 py-12 md:flex-row md:justify-between lg:py-16">
          <div className="max-w-sm">
            <Link href="/" aria-label="Human Marketing, ir al inicio">
              <Image
                src="/logos/Logo_human_marketing_A.webp"
                alt="Human Marketing"
                width={5087}
                height={594}
                className="h-6 w-auto"
              />
            </Link>
            {/* TODO: tagline / descripcion corta de la agencia */}
          </div>

          <nav aria-label="Navegacion del pie de pagina">
            <h2 className="mb-4 text-sm uppercase tracking-widest text-tinta/50">
              Sitio
            </h2>
            <ul className="flex flex-col gap-3">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-tinta/70 transition-colors hover:text-tinta"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 text-sm uppercase tracking-widest text-tinta/50">
              Contacto
            </h2>
            {/* TODO: direccion, telefono, correo y redes sociales */}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-tinta/10 py-6 text-sm text-tinta/50 md:flex-row md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. Todos los derechos
            reservados.
          </p>
          {/* TODO: aviso de privacidad y terminos */}
        </div>
      </Container>
    </footer>
  );
}
