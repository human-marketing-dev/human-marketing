import {
  CinematicLogoCloud,
  type LogoCloudClient,
} from "@/components/ui/cinematic-logo-cloud";

// El `name` es el texto alt de cada logo. Criterio: refleja lo que dice el arte
// del lockup (descriptor incluido si esta en el arte), sin ALL CAPS, sin
// puntuacion decorativa y sin sufijos legales (Inc., S.A. de C.V., S. de R.L.).
const clientes: LogoCloudClient[] = [
  { name: "Ágora Grupo Inmobiliario", src: "/clientes/agora-residencial-logo-black.webp", width: 958, height: 400 },
  { name: "Alianza Médica", src: "/clientes/alianza-medica-logo-black.webp", width: 958, height: 192 },
  { name: "Berard Seguros y Fianzas", src: "/clientes/berard-seguros-logo-black.webp", width: 635, height: 520, className: "h-10 md:h-12" },
  { name: "Birdman", src: "/clientes/birdman-logo-black.webp", width: 960, height: 336 },
  { name: "Cafeliers", src: "/clientes/cafeliers-logo-black.webp", width: 960, height: 448 },
  { name: "Dulceleste", src: "/clientes/dulceleste-logo-black.webp", width: 956, height: 415 },
  { name: "Educar en Conexión", src: "/clientes/educar-en-conexion-logo-black.webp", width: 949, height: 311 },
  { name: "Eyenovation", src: "/clientes/eye-novation-logo-black.webp", width: 960, height: 158 },
  { name: "Grupo FAC", src: "/clientes/grupo-fac-logo-black.webp", width: 708, height: 540, className: "h-10 md:h-12" },
  { name: "Grupo GP", src: "/clientes/grupo-gp-logo-black.webp", width: 935, height: 296 },
  { name: "Grupo Novaliv", src: "/clientes/grupo-novaliv-logo-black.webp", width: 954, height: 315 },
  { name: "Indimex Trading", src: "/clientes/indimex-trading-logo-black.webp", width: 960, height: 478 },
  { name: "Intelligent Uniforms", src: "/clientes/intelligent-uniforms-logo-black.webp", width: 960, height: 46 },
  { name: "Jerome and Zimmerman", src: "/clientes/jerome-and-zimmerman-logo-black.webp", width: 960, height: 228 },
  { name: "La Dulce Libélula", src: "/clientes/la-dulce-libelula-logo-black.webp", width: 326, height: 505, className: "h-12 md:h-14" },
  { name: "La Tinta", src: "/clientes/la-tinta-logo-black.webp", width: 960, height: 116 },
  { name: "Lorenza Jewelry", src: "/clientes/lorenza-jewelry-logo-black.webp", width: 954, height: 160 },
  { name: "Mar y Mar", src: "/clientes/mar-y-mar-logo.webp", width: 960, height: 84 },
  { name: "Monchitos Snack", src: "/clientes/monchitos-snacks-logo-black.webp", width: 956, height: 264 },
  { name: "MTE Global Solutions", src: "/clientes/mte-global-solutions-logo-black.webp", width: 950, height: 410 },
  // TODO(alt): sin presencia web verificable. Si la marca escribe "Patria" en
  // texto corrido, el punto es decorativo y hay que quitarlo.
  { name: "PATR.IA", src: "/clientes/patr-ia-logo-black.webp", width: 960, height: 156 },
  { name: "Peach & Posh", src: "/clientes/peach-and-posch-logo-black.webp", width: 950, height: 66 },
  { name: "Plastic Ingenuity de México", src: "/clientes/plastic-ingenuity-de-mexico-logo-black.webp", width: 954, height: 322 },
  { name: "Popit!", src: "/clientes/pop-it-logo-black.webp", width: 956, height: 334 },
  { name: "Pure Tribe", src: "/clientes/pure-tribe-logo-black.webp", width: 882, height: 506, className: "h-10 md:h-12" },
  { name: "RG MX", src: "/clientes/rg-mx-logo-black.webp", width: 930, height: 348 },
  { name: "RG NY", src: "/clientes/rg-ny-logo-black.webp", width: 954, height: 390 },
  { name: "Santte Residencial", src: "/clientes/santte-residencial-logo-black.webp", width: 756, height: 530, className: "h-10 md:h-12" },
  { name: "SAVY Industrial Park", src: "/clientes/savy-industrial-park-logo-black.webp", width: 934, height: 346 },
  { name: "Steel Dynamics", src: "/clientes/steel-dynamics-logo-black.webp", width: 960, height: 198 },
  { name: "Sugarblood", src: "/clientes/sugar-blood-logo-black.webp", width: 952, height: 70 },
  { name: "Tecnográficos", src: "/clientes/tecnograficos-logo-black.webp", width: 958, height: 534, className: "h-10 md:h-12" },
  { name: "Tecnológico de Monterrey", src: "/clientes/tecnologico-de-monterrey-logo-black.webp", width: 952, height: 250 },
  { name: "Tododren", src: "/clientes/tododren-logo-black.webp", width: 958, height: 309 },
  { name: "WallWorks", src: "/clientes/wall-works-logo-black.webp", width: 960, height: 108 },
  { name: "Yömms Snacks", src: "/clientes/yomms-snacks-logo-black.webp", width: 959, height: 326 },
];

export function Clientes() {
  return (
    <section id="clientes" aria-label="Nuestros clientes">
      <CinematicLogoCloud clients={clientes} />
    </section>
  );
}
