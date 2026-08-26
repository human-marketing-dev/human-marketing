"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { Container } from "@/components/layout/Container";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { mainNav } from "@/lib/site";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Cerrar al navegar. Ajuste de estado durante el render (el patron que
  // recomienda React), no un efecto: el Dialog no se entera del cambio de ruta
  // por si solo y los Link ya cubren solo el click, no el back del navegador.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  // Sin margen lateral: la barra ocupa todo el ancho del lienzo. Arriba y abajo
  // 12px, y el mismo valor en top-3 al pegarse, asi que no hay transicion.
  return (
    <header className="sticky top-3 z-50 mx-auto w-full max-w-site mt-3 mb-3">
      <div className="bg-background border border-transparent">
        <div className="flex h-[var(--header-height)] items-center justify-between gap-8 px-6 lg:px-8">
          <Link
            href="/"
            aria-label="Human Marketing, ir al inicio"
            className="shrink-0"
          >
            <Image
              src="/logos/Logo_human_marketing_A.webp"
              alt="Human Marketing"
              width={5087}
              height={594}
              priority
              className="h-6 w-auto lg:h-7"
            />
          </Link>

          <nav aria-label="Navegación principal" className="hidden md:block">
            <ul className="flex items-center gap-8 text-base">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={
                        active
                          ? "text-foreground underline underline-offset-8"
                          : "text-muted-foreground hover:text-foreground transition-colors"
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
              aria-label="Abrir menú"
              className="text-foreground md:hidden"
            >
              <Menu className="size-6" />
            </DialogTrigger>

            {/* z-60 para ganarle al z-50 del header. Radix bloquea el scroll del
                body y atrapa el foco mientras esta abierto. */}
            <DialogContent
              showCloseButton={false}
              aria-describedby={undefined}
              className="bg-background top-0 left-0 z-60 h-dvh max-w-none translate-x-0 translate-y-0 gap-0 rounded-none p-0 ring-0 sm:max-w-none"
            >
              <DialogTitle className="sr-only">
                Navegación principal
              </DialogTitle>

              <Container>
                <div className="flex h-[var(--header-height)] items-center justify-between">
                  <Image
                    src="/logos/Logo_human_marketing_A.webp"
                    alt="Human Marketing"
                    width={5087}
                    height={594}
                    className="h-6 w-auto"
                  />
                  <DialogClose
                    aria-label="Cerrar menú"
                    className="text-foreground"
                  >
                    <X className="size-6" />
                  </DialogClose>
                </div>

                <nav aria-label="Navegación principal">
                  <ul className="flex flex-col gap-6 pt-6 text-2xl">
                    {mainNav.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={
                            isActive(pathname, item.href) ? "page" : undefined
                          }
                          onClick={() => setOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Container>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
