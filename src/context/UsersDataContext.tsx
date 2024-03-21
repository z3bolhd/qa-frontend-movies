import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";

import { getUserSession } from "@hooks/getUserSession";
import { getUsers } from "@lib/api";
import { GetUsersResponse, User } from "@lib/types";

interface UsersDataContextProps extends Omit<GetUsersResponse, "pageSize" | "page"> {
  isLoading: boolean;
  currentPage: number;
  createdAt: "asc" | "desc";
  setCreatedAt: Dispatch<SetStateAction<"asc" | "desc">>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  fetchUsers: () => void;
}

const initialState: UsersDataContextProps = {
  users: [],
  isLoading: true,
  currentPage: 1,
  createdAt: "desc",
  count: 0,
  setCurrentPage: () => {},
  setCreatedAt: () => {},
  pageCount: 0,
  fetchUsers: () => {},
};

const UsersDataContext = createContext<UsersDataContextProps>(initialState);

const UsersDataContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [createdAt, setCreatedAt] = useState<"desc" | "asc">("desc");

  const { accessToken } = getUserSession();

  const fetchUsers = async () => {
    setIsLoading(true);

    if (!accessToken) {
      return;
    }

    const data = await getUsers(
      {
        page: currentPage,
        pageSize: 10,
        createdAt: "desc",
      },
      accessToken!,
    );

    if (!data) {
      return;
    }

    const { users, pageCount, count } = data;

    setIsLoading(false);
    setUsers(users);
    setPageCount(pageCount);
    setCount(count);
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, accessToken]);

  return (
    <UsersDataContext.Provider
      value={{
        users,
        fetchUsers,
        isLoading,
        pageCount,
        count,
        currentPage,
        setCurrentPage,
        createdAt,
        setCreatedAt,
      }}
    >
      {children}
    </UsersDataContext.Provider>
  );
};

export { UsersDataContext, UsersDataContextProvider };
