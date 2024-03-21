import { useSession } from "next-auth/react";

export const getUserSession = () => {
  const session = useSession();
  return { ...session.data };
};
