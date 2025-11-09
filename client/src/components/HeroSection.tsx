import heroImage from "@assets/generated_images/Vineyard_hero_background_image_43625f1c.png";

export function HeroSection() {
  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="font-serif text-5xl md:text-7xl font-light leading-tight text-white mb-8" data-testid="text-hero-title">
          Wine Should Feel Like Memory
        </h1>
        <p className="text-lg md:text-xl text-white/90 leading-relaxed italic max-w-3xl mx-auto" data-testid="text-hero-subtitle">
          Barrel + Verse was born from the belief that wine should be the convergence of place, time, and emotion. The best bottles aren't meant to simply be tasted—they're meant to be experienced. Like a great song, they linger. They move. They connect us.
        </p>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
