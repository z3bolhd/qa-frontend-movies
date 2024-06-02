import UserProfile from "./components/UserProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Профиль | Cinescope",
  description: "Профиль пользователя",
};

const ProfilePage = async () => {
  return <UserProfile />;
};

export default ProfilePage;
