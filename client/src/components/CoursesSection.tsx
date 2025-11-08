import { CourseCard } from "./CourseCard";
import { Users, Video, BookOpen } from "lucide-react";

export function CoursesSection() {
  const courses = [
    {
      icon: Users,
      title: "In-Person Masterclasses",
      description: "Small gatherings with 4–6 bottles, food pairings, and story-led learning",
    },
    {
      icon: Video,
      title: "Self-Paced Video Courses",
      description: "Learn terroir, tasting, and pairing at your own rhythm",
    },
    {
      icon: BookOpen,
      title: "Resources & Membership",
      description: "Tasting sheets, pairing guides, and community Q&As",
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
            Deepen your understanding through intimate learning experiences
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
