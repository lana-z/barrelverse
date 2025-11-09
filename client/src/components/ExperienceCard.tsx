import { Card, CardContent } from "@/components/ui/card";

interface ExperienceCardProps {
  image: string;
  title: string;
  description: string;
  quote?: string;
}

export function ExperienceCard({ image, title, description, quote }: ExperienceCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate transition-transform duration-300 shadow-xl" data-testid={`card-experience-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          data-testid={`img-experience-${title.toLowerCase().replace(/\s+/g, '-')}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />
      </div>
      <CardContent className="p-8 space-y-4">
        <h3 className="font-serif text-2xl font-normal text-foreground" data-testid={`text-experience-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {title}
        </h3>
        <p className="text-base leading-relaxed text-foreground/80" data-testid={`text-experience-description-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {description}
        </p>
        {quote && (
          <p className="italic text-sm text-muted-foreground border-l-2 border-primary/40 pl-4" data-testid={`text-experience-quote-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {quote}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
