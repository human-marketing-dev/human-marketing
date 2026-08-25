export type FeaturedVideo = {
  id: string;
  hash: string;
  title: string;
  poster: string;
};

/**
 * Separador de titulo: punto medio `·` (U+00B7), NO la barra `|`.
 *
 * Human Sans mapea `|` (y `¦`) pero el glifo esta VACIO: avance de 40/1000 em
 * y sin contorno, asi que renderiza como un espacio de pelo invisible y el
 * titulo se lee "Titulo  Cliente" con un hueco raro. No lo "corrijas" de vuelta
 * a `|` hasta que llegue un archivo de fuente arreglado.
 * Verificable con: python3 scripts/audit-font-glyphs.py
 *
 * El video #1 usa `x` en vez de `·` a proposito: ahi une dos marcas
 * (Cinepolis x Indimex Trading), no titulo con cliente.
 */
export const featuredVideos: FeaturedVideo[] = [
  {
    id: "1106209575",
    hash: "71f234ed6c",
    title: "Vasos Personalizados Cinépolis x Indimex Trading",
    poster: "/videos/1106209575.webp",
  },
  {
    id: "1101711559",
    hash: "43547861ab",
    title: "This or That · Peach & Posh",
    poster: "/videos/1101711559.webp",
  },
  {
    id: "1105870494",
    hash: "0d3a4bae80",
    title: "El Futuro de Nuestras Ciudades · Grupo FAC",
    poster: "/videos/1105870494.webp",
  },
  {
    id: "1105870559",
    hash: "f193b940c6",
    title: "¿Quién es Erika? · Berard Seguros",
    poster: "/videos/1105870559.webp",
  },
];

/** Los 4 videos son 1080x1920 (9:16). El poster se sirve a esas dimensiones. */
export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;

/**
 * El hash `h` va siempre, aunque la privacidad actual quiza no lo exija:
 * no estorba y evita que truene si cambia la configuracion en Vimeo.
 */
export function vimeoEmbedUrl({ id, hash }: FeaturedVideo): string {
  return `https://player.vimeo.com/video/${id}?h=${hash}&autoplay=1&title=0&byline=0&portrait=0&dnt=1`;
}
