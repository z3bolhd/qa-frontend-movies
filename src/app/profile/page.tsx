import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UserProfile from "./components/UserProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Профиль | Cinescope",
  description: "Профиль пользователя",
};

const ProfilePage = async () => {
  const session = await getServerSession();

  if (!session?.user) {
    return redirect("/login");
  }

  return <UserProfile />;
};

export default ProfilePage;
