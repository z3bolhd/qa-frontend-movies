"use client";

import { redirect } from "next/navigation";

import { Role } from "@lib/types";
import useSession from "@hooks/useSession";

const DashboardPage = async () => {
  const { session } = useSession();

  const isAdmin = session?.roles.includes(Role.ADMIN);

  if (!session) {
    return redirect("/unauthorized");
  }

  if (!isAdmin) {
    return redirect("/unauthorized");
  }

  return (
    <div className="w-full h-full flex items-center justify-center box-border">
      <p className="text-xl">Выберите вкладку из панели</p>
    </div>
  );
};

export default DashboardPage;
