"use client";

import UsersTable from "./_components/Table";
import UserCreate from "./_components/UserCreate";

import { useQuery } from "react-query";

import { useState } from "react";
import { GetUsersParams } from "@lib/types";
import LoadingSpinner from "@components/LoadingSpinner";
import { AuthService } from "@api/services/AuthService";

const DashboardUsersPage = () => {
  const [userFilters, setUserFilters] = useState<GetUsersParams>({
    createdAt: "desc",
  });

  const { data, isLoading, isError, status } = useQuery(["users", userFilters], () =>
    AuthService.getUsers({ params: userFilters }),
  );

  if (isError && !isLoading && !data) {
    return <p className="text-xl mt-36">Что-то пошло не так</p>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-4xl">Пользователи</h2>
        <UserCreate />
      </div>
      {isLoading ? (
        <div className="mt-36">
          <LoadingSpinner size={50} />
        </div>
      ) : (
        <UsersTable usersResponse={data!.data} setFilters={setUserFilters} />
      )}
    </div>
  );
};

export default DashboardUsersPage;
