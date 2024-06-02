"use client";

import UserPayments from "./UserPayments";
import useSession from "@hooks/useSession";

const UserProfile = () => {
  const { session } = useSession();

  if (!session) {
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
            <li>ID: {session.id}</li>
            <li>ФИО: {session.fullName}</li>
            <li>Email: {session.email}</li>
            <li>Роли: {session.roles.join(", ")}</li>
          </ul>
        </div>
      </div>

      <UserPayments />
    </main>
  );
};

export default UserProfile;
