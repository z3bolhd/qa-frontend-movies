"use client";

import UsersTable from "./_components/Table";
import UserCreate from "./_components/UserCreate";

import { useQuery } from "react-query";
import { getUsers } from "@lib/api";
import { useState } from "react";
import { GetUsersParams } from "@lib/types";
import LoadingSpinner from "@components/LoadingSpinner";

const DashboardUsersPage = () => {
  const [userFilters, setUserFilters] = useState<GetUsersParams>({
    createdAt: "desc",
  });

  const { data, isLoading, error, status } = useQuery(["users", userFilters], () =>
    getUsers(userFilters),
  );

  const usersResponse = data?.data;

  if (
    ((error || !data?.status) && !isLoading && status === "success" && data?.status !== 200) ||
    !usersResponse
  ) {
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
        <UsersTable usersResponse={usersResponse} setFilters={setUserFilters} />
      )}
    </div>
  );
};

export default DashboardUsersPage;
