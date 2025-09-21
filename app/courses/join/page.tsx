import CourseForm from "@/components/course_form";

export default async function JoinCoursePage() {
  return (
    <div className="flex items-center justify-center">
      <CourseForm create={false} />
    </div>
  );
}
