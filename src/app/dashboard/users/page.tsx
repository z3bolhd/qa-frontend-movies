"use client";

import { UsersDataContextProvider } from "@context/UsersDataContext";

import UsersTable from "./_components/Table";
import UserCreate from "./_components/UserCreate";

const DashboardUsersPage = () => {
  return (
    <UsersDataContextProvider>
      <div>
        <div className="flex justify-between">
          <h2 className="text-4xl">Пользователи</h2>
          <UserCreate />
        </div>
        <UsersTable />
      </div>
    </UsersDataContextProvider>
  );
};

export default DashboardUsersPage;
