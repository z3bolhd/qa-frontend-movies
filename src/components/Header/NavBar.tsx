"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { getIsAdmin } from "@hooks/getIsAdmin";

const NavBar = () => {
  const pathname = usePathname();
  const isAdmin = getIsAdmin();
  const isDashboardPage = pathname.includes("/dashboard");
  const isProfilePage = pathname.includes("/profile");

  return (
    <nav className="ml-10 flex items-center">
      <ul className="flex">
        <li>
          {isDashboardPage ? (
            <Link href="/">Вернуться на главную</Link>
          ) : (
            <Link href="/movies">Все фильмы</Link>
          )}
        </li>
        {isAdmin && isProfilePage && (
          <li className="ml-5">
            <Link href="/dashboard">Админ панель</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
