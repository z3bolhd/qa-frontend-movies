"use client";

import { getUserSession } from "@hooks/getUserSession";
import UserPayments from "./UserPayments";

const UserProfile = () => {
  const { user } = getUserSession();

  if (!user) {
    return null;
  }

  return (
    <main className="mt-10">
      <div>
        <div>
          <h2 className="text-4xl">Профиль</h2>
        </div>

        <div className="mt-10 text-xl">
          <ul className="flex flex-col gap-2">
            <li>ID: {user.id}</li>
            <li>ФИО: {user.fullName}</li>
            <li>Email: {user.email}</li>
            <li>Роли: {user.roles.join(", ")}</li>
          </ul>
        </div>
      </div>

      <UserPayments />
    </main>
  );
};

export default UserProfile;
