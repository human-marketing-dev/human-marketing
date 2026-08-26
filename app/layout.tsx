import type { Metadata } from "next";
import localFont from "next/font/local";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site } from "@/lib/site";
import "./globals.css";
import { cn } from "@/lib/utils";

const humanSans = localFont({
  src: "./fonts/HumanSans-Regular.woff2",
  variable: "--font-human-sans",
  weight: "400",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    url: "/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-MX"
      className={cn("h-full antialiased font-sans", humanSans.variable)}
    >
      <body className="min-h-full bg-papel text-tinta">
        {/* El lienzo de 1450px ya no vive aqui sino en cada componente (via
            Container o `max-w-site` explicito), para que LeadForm y Footer
            puedan sangrar su fondo hasta los bordes de la ventana. */}
        <div className="flex min-h-dvh w-full flex-col">
          <Header />
          <main id="contenido" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
