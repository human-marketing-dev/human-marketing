import { Hero } from "@/components/sections/hero";
import { AgenciaMarketingDigital } from "@/components/sections/agencia-marketing-digital";
import { Clientes } from "@/components/sections/clientes";
import { Portafolio } from "@/components/sections/portafolio";
import { Servicios } from "@/components/sections/servicios";
import { VideosDestacados } from "@/components/sections/videos-destacados";
import { LeadForm } from "@/components/sections/lead-form";
import { Reviews } from "@/components/home/Reviews";

// TODO: title absoluto y description con las keywords del Home
// export const metadata: Metadata = { title: { absolute: "..." }, description: "..." };

export default function Home() {
  return (
    <>
      <Hero />
      <AgenciaMarketingDigital />
      <Clientes />
      <Servicios />
      <Portafolio />
      <VideosDestacados />
      <Reviews />
      <LeadForm />
    </>
  );
}
