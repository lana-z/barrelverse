import founderImage from "@assets/generated_images/Founder_portrait_for_about_384fecda.png";

export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-8 text-foreground" data-testid="text-about-title">
              About Me
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-foreground/80" data-testid="text-about-content">
              <p>
                Hi — I'm [Your Name], founder of Barrel + Verse. I come to wine not as a
                credential‑chasher but as a curious soul drawn to the land, the table and the people
                behind the bottle.
              </p>
              <p>
                I've wandered vineyard rows, sat at family tables, and poured glasses for friends in
                kitchens that hummed with conversation.
              </p>
              <p className="italic text-xl text-primary font-light">
                I believe the best wines don't just age — they live with us.
              </p>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative">
              <img
                src={founderImage}
                alt="Founder of Barrel + Verse"
                className="w-full rounded-md shadow-lg"
                data-testid="img-founder"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
