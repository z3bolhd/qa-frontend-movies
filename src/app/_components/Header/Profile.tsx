"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import { Button } from "@components/ui/button";

const Profile = () => {
  const session = useSession();
  const path = usePathname();

  const isProfilePage = path === "/profile";

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="flex items-center mr-0 ml-auto">
      {session.data ? (
        <>
          <div className="w-[40px] h-[40px] rounded-full mr-5 border-2 flex items-center justify-center">
            <p className="text-black text-sm">{session.data.user.fullName[0]?.toUpperCase()}</p>
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
