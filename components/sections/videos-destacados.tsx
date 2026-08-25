import { Container } from "@/components/layout/Container";
import { VideoShowcase } from "@/components/ui/video-showcase";
import { featuredVideos } from "@/lib/videos";

export function VideosDestacados() {
  return (
    <section id="videos" aria-label="Videos destacados" className="py-16 lg:py-24">
      <Container>
        <VideoShowcase
          videos={featuredVideos}
          title="Videos Destacados"
          ctaLabel="Explorar videos"
          // TODO(ctaHref): definir destino. Candidato: /portafolio filtrado por video.
          ctaHref="#"
        />
      </Container>
    </section>
  );
}
