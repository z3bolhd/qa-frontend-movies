import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@app/api/auth/[...nextauth]/options";
import { Role } from "@lib/types";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/unauthorized");
  }

  const isAdmin = session.user.roles.includes(Role.ADMIN);

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
