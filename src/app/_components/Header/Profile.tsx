"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@components/ui/button";
import useSession from "@hooks/useSession";

const Profile = () => {
  const { signOut, session } = useSession();
  const router = useRouter();
  const path = usePathname();

  const isProfilePage = path === "/profile";

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  return (
    <div className="flex items-center mr-0 ml-auto">
      {session ? (
        <>
          <div className="w-[40px] h-[40px] rounded-full mr-5 border-2 flex items-center justify-center">
            <p className="text-black text-sm">{session?.fullName?.charAt(0) || ""}</p>
          </div>
          {isProfilePage ? (
            <Button variant="destructive" onClick={handleSignOut}>
              Выход
            </Button>
          ) : (
            <Link href="/profile">
              <Button type="button">Профиль</Button>
            </Link>
          )}
        </>
      ) : (
        <Link href="/login">
          <Button type="button">Войти</Button>
        </Link>
      )}
    </div>
  );
};

export default Profile;
