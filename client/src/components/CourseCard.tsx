import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface CourseCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function CourseCard({ icon: Icon, title, description }: CourseCardProps) {
  return (
    <Card className="hover-elevate transition-transform duration-300" data-testid={`card-course-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="pb-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="font-serif text-2xl font-normal" data-testid={`text-course-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className="text-base leading-relaxed" data-testid={`text-course-description-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {description}
        </CardDescription>
        <Button variant="outline" className="w-full" data-testid={`button-learn-more-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
}
