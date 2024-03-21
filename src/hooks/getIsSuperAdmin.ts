"use client";

import { Role } from "@lib/types";
import { useSession } from "next-auth/react";

export const getIsSuperAdmin = () => {
  const session = useSession();
  return session.data?.user?.roles.includes(Role.SUPER_ADMIN) || false;
};
