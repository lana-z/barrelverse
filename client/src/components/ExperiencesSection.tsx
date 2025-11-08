import { ExperienceCard } from "./ExperienceCard";
import riojaImage from "@assets/generated_images/Rioja_wine_pour_detail_8c180a9a.png";
import eventImage from "@assets/generated_images/Wine_tasting_experience_event_a36dc24a.png";

export function ExperiencesSection() {
  const experiences = [
    {
      image: eventImage,
      title: "Feel Rioja — An Evening of Soul, Soil & Story",
      description:
        "This isn't a formal tasting. It's an evening exploring Rioja's soul — from limestone Alavesa to chalky Alta to sun-warmed Oriental. Wines that breathe and hum with life. Four to six bottles, a few plates of food, stories that drift, and conversation that finds its own rhythm.",
      quote:
        "Come for the wine, stay for the company — and maybe leave with a new understanding of what Rioja really means.",
    },
    {
      image: riojaImage,
      title: "Beyond the Bottle",
      description:
        "An intimate exploration of the people and places behind exceptional wines. Each event features carefully selected bottles paired with seasonal cuisine.",
      quote: "Wine is more than what's in the glass — it's the story waiting to be told.",
    },
  ];

  return (
    <section id="experiences" className="py-24 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-6 text-foreground" data-testid="text-experiences-title">
            Experiences
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Curated wine and food events that celebrate story, place, and connection
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.title} {...experience} />
          ))}
        </div>
      </div>
    </section>
  );
}
