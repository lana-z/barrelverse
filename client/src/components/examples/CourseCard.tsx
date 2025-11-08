import { CourseCard } from "../CourseCard";
import { Users } from "lucide-react";

export default function CourseCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <CourseCard
        icon={Users}
        title="In-Person Masterclasses"
        description="Small gatherings with 4–6 bottles, food pairings, and story-led learning"
      />
    </div>
  );
}
