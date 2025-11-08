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
                Hi — I'm Mitchell Robertson, founder of Barrel + Verse. I'm a winemaker, educator, and storyteller who believes a good glass of wine should tell you something true: about the land, yes, but also about the people who tend it, and the hands that lift the bottle to the table.
              </p>
              <p>
                I come to wine not by straight path but by appetite. Through my journey, I've captured wine stories and created educational experiences that connect people more deeply to what's in their glass—from vineyard sourcing and winemaking to workshops that explore not just how wine is made, but why it matters.
              </p>
              <p>
                With certifications in Oenology, Viticulture, WSET, and the Rioja Wine Diploma, alongside work across more than 30 countries, I've learned to listen first, translate without flattening, and celebrate specificity. My dream is to eventually build a small winery in Spain's Basque Country—but for now, I'm here to share what I've learned and help others discover how alive wine really is.
              </p>
              <p className="italic text-xl text-primary font-light">
                A good bottle of wine is like a great song. It lingers. It moves. It connects us.
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
