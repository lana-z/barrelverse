import { ExperienceCard } from "../ExperienceCard";
import experienceImage from "@assets/generated_images/Wine_tasting_experience_event_a36dc24a.png";

export default function ExperienceCardExample() {
  return (
    <div className="p-8 max-w-md">
      <ExperienceCard
        image={experienceImage}
        title="Feel Rioja — An Evening of Soul, Soil & Story"
        description="This isn't a formal tasting. It's an evening exploring Rioja's soul — from limestone Alavesa to chalky Alta to sun-warmed Oriental. Wines that breathe and hum with life."
        quote="Come for the wine, stay for the company — and maybe leave with a new understanding of what Rioja really means."
      />
    </div>
  );
}
