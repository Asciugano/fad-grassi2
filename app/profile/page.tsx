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

  return (
    <div>
      <div className="flex items-center justify-center bg-neutral-200 dark:bg-neutral-800 rounded-lg shadow w-full px-4 py-2">
        {/* user information */}
        <div>
          <h2 className="text-lg font-semibold text-center">
            Benvenuto <span className="text-2xl font-bold text-amber-400">{user.username}</span>
          </h2>

          <p className="mt-8 text-neutral-500 dark:text-neutral-400 text-sm">La tua email:
            <span className="text-sm text-amber-400 hover:underline">{user.email}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center mt-8">
        <UserFormComponent user={user} />
      </div>
    </div>
  );
}
