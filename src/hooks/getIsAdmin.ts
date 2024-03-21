"use client";

import { Role } from "@lib/types";
import { useSession } from "next-auth/react";

export const getIsAdmin = () => {
  const session = useSession();
  return session.data?.user?.roles.includes(Role.ADMIN) || false;
};
