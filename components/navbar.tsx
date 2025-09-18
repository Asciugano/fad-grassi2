import { User } from "lucide-react";
import Link from "next/link";

export default async function NavBar({
  logged
}: {
  logged: boolean
}) {

  return (
    <div>
      <nav>
        {/* LOGO */}
        <div>
          <Link href='/'>FAD Grassi</Link>
        </div>

        {/* Link To */}
        <div>
          <div>
            <User size={18} />
            <Link href='/profile'>Profilo</Link>
          </div>
          <div>
            <Link href='/courses'>Corsi</Link>
          </div>
          <div>
            <Link href='/home-works'>Compiti</Link>
          </div>
        </div>

        {/* Login o logout btn */}
        <div>
          {!logged ? (
            <div>
              <Link href='/login'>Login</Link>
            </div>
          ) : (
            <div>
              <Link href='/logout'>Logout</Link>
            </div>
          )
          }
        </div>
      </nav>
    </div>
  );
}
