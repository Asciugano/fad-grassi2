"use client";

import { User } from "@/lib/generated/prisma";
import { useState } from "react";

export default function UserFormComponent({ user, changeEmail }: { user: User, changeEmail?: boolean }) {
  const [emailForm, setEmailForm] = useState({
    email: "",
    confirm: "",
  });

  return (
    <div className="flex items-center justify-center bg-neutral-200 dark:bg-neutral-800 rounded-lg shadow w-full px-4 py-2 mt-8">
      <h2 className="text-lg font-semibold">
        Cambia la tua{" "} {changeEmail ? "email" : "password"}
      </h2>
    </div>
  );
}
