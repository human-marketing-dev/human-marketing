import { Hero } from "@/components/sections/hero";
import { AgenciaMarketingDigital } from "@/components/sections/agencia-marketing-digital";
import { Clientes } from "@/components/sections/clientes";
import { VideosDestacados } from "@/components/sections/videos-destacados";
import { LeadFormCta } from "@/components/home/LeadFormCta";
import { Portfolio } from "@/components/home/Portfolio";
import { Reviews } from "@/components/home/Reviews";
import { Services } from "@/components/home/Services";

// TODO: title absoluto y description con las keywords del Home
// export const metadata: Metadata = { title: { absolute: "..." }, description: "..." };

export default function Home() {
  return (
    <>
      <Hero />
      <AgenciaMarketingDigital />
      <Clientes />
      <Services />
      <Portfolio />
      <VideosDestacados />
      <Reviews />
      <LeadFormCta />
    </>
  );
}
