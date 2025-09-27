import UserFormComponent from "@/components/user_form";
import { prisma } from "@/lib/prisma";
import { getUserIDFromToken } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function ProfilePage() {
  const userId = await getUserIDFromToken();
  if (!userId)
    notFound();

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user)
    notFound();

  const numberOfCourse = await prisma.course.count({
    where: {
      OR: [
        {
          enrollments: {
            some: { userId }
          },
        },
        {
          teacherId: userId,
        }
      ],
    },
  });

  return (
    <div>
      <div className="flex items-center justify-center bg-neutral-200 dark:bg-neutral-800 rounded-lg shadow w-full px-4 py-2">
        {/* user information */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-center">
            Benvenuto <span className="text-2xl font-bold text-amber-400">{user.username}</span>
          </h2>

          <p className="mt-8 text-neutral-500 dark:text-neutral-400 text-sm">La tua email:
            <span className="text-sm text-amber-400 hover:underline">{user.email}</span>
          </p>

          <p className="mt-8 text-sm">Sei inscritto a{" "}
            <span className="text-amber-400">{numberOfCourse}</span>
            {" "}Corsi
          </p>

          <div>
            <p className="mt-8 text-sm">
              Primo accesso: {" "}
              <span className="text-amber-400">{user.created_at.toLocaleDateString()}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-8">
        <UserFormComponent user={user} />
      </div>
    </div>
  );
}
