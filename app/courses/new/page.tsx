import CourseForm from "@/components/course_form";

export default async function CreateCoursePage() {
  return (
    <div className="flex items-center justify-center">
      <CourseForm create={true} />
    </div>
  )
}
