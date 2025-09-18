import { User, BookOpen, ClipboardList, LogIn, LogOut } from "lucide-react";
import Link from "next/link";

export default function NavBar({ logged }: { logged: boolean }) {
  return (
    <nav className="mx-4 my-4 rounded-xl bg-neutral-200 dark:bg-neutral-900 shadow-lg">
      <div className="flex items-center justify-between px-6 py-3">
        {/* SINISTRA: Logo */}
        <div>
          <Link
            href="/"
            className="text-xl font-bold tracking-wide text-amber-400 hover:text-amber-300 transition"
          >
            FAD Grassi
          </Link>
        </div>

        {/* DESTRA: Links + Login/Logout */}
        <div className="flex items-center space-x-6">
          {/* Links */}
          <Link
            href="/profile"
            className="flex items-center gap-1 hover:text-amber-400 transition"
          >
            <User size={18} />
            <span>Profilo</span>
          </Link>

          <Link
            href="/courses"
            className="flex items-center gap-1 hover:text-amber-400 transition"
          >
            <BookOpen size={18} />
            <span>Corsi</span>
          </Link>

          <Link
            href="/home-works"
            className="flex items-center gap-1 hover:text-amber-400 transition"
          >
            <ClipboardList size={18} />
            <span>Compiti</span>
          </Link>

          {/* Login o Logout */}
          {!logged ? (
            <Link
              href="/login"
              className="flex items-center gap-1 px-4 py-2 text-white rounded-lg bg-amber-400 hover:bg-amber-300 transition"
            >
              <LogIn size={18} />
              <span>Login</span>
            </Link>
          ) : (
            <Link
              href="/logout"
              className="flex items-center gap-1 px-4 py-2 text-white rounded-lg bg-red-600 hover:bg-red-500 transition"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
