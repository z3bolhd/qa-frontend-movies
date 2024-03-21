"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthContextProps {
  children: React.ReactNode;
}

export const AuthContext = ({ children }: AuthContextProps) => {
  const { data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (data?.error === "RefreshAccessTokenError") {
      signOut();
    }
  }, [data?.error, router]);

  return <>{children}</>;
};
