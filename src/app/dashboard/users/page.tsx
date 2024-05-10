"use client";

import UsersTable from "./_components/Table";
import UserCreate from "./_components/UserCreate";
import { getUserSession } from "@hooks/getUserSession";
import { useQuery } from "react-query";
import { getUsers } from "@lib/api";
import { useState } from "react";
import { GetUsersParams } from "@lib/types";
import LoadingSpinner from "@components/LoadingSpinner";

const DashboardUsersPage = () => {
  const { accessToken } = getUserSession();
  const [userFilters, setUserFilters] = useState<GetUsersParams>({
    createdAt: "desc",
  });

  const { data, isLoading, error, status } = useQuery(
    ["users", userFilters],
    () => getUsers(userFilters, accessToken!),
    {
      enabled: !!accessToken,
    },
  );

  if ((error || !data) && !isLoading && status === "success") {
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
        <UsersTable usersResponse={data!} setFilters={setUserFilters} />
      )}
    </div>
  );
};

export default DashboardUsersPage;
