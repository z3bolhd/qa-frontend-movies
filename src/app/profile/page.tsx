import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UserProfile from "./components/UserProfile";

const ProfilePage = async () => {
  const session = await getServerSession();

  if (!session?.user) {
    return redirect("/login");
  }

  return <UserProfile />;
};

export default ProfilePage;
