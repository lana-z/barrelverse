import { CourseCard } from "./CourseCard";
import { Users, Video, BookOpen } from "lucide-react";

export function CoursesSection() {
  const courses = [
    {
      icon: Users,
      title: "In-Person Masterclasses",
      description: "Intimate gatherings exploring wines from around the world with 4–6 bottles, curated food pairings, and story-led learning. For beginners discovering terroir to advanced students refining their palate.",
    },
    {
      icon: Video,
      title: "Self-Paced Video Courses",
      description: "Explore global wine regions, tasting techniques, and food pairing fundamentals at your own rhythm. From foundational knowledge to advanced topics like biodynamic winemaking and vineyard management.",
    },
    {
      icon: BookOpen,
      title: "Resources & Membership",
      description: "Access tasting sheets, regional guides, pairing frameworks, and join our community for monthly Q&As, exclusive content, and first access to new experiences.",
    },
  ];

  return (
    <section id="courses" className="py-24 md:py-32 bg-card">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-6 text-foreground" data-testid="text-courses-title">
            Courses
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From your first glass to advanced appreciation—explore wine through story, culture, and place
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.title} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
}
