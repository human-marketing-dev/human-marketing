"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Container } from "@/components/layout/Container";
import { mainNav } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-tinta/10">
      <Container>
        <div className="flex h-20 items-center justify-between gap-8 lg:h-24">
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

          <nav aria-label="Navegacion principal" className="hidden md:block">
            <ul className="flex items-center gap-8 text-base">
              {mainNav.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={
                        active
                          ? "text-tinta underline underline-offset-8"
                          : "text-tinta/70 transition-colors hover:text-tinta"
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-movil"
            className="md:hidden"
          >
            {open ? "Cerrar" : "Menu"}
          </button>
        </div>

        {open ? (
          <nav
            id="menu-movil"
            aria-label="Navegacion principal movil"
            className="pb-6 md:hidden"
          >
            <ul className="flex flex-col gap-4 text-lg">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </Container>
    </header>
  );
}
