"use client";

import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";

import { getUserSession } from "@hooks/getUserSession";
import { getPayments } from "@lib/api";
import { GetPaymentsResponse, Payment } from "@lib/types";

interface PaymentsDataContextProps extends Omit<GetPaymentsResponse, "pageSize" | "page"> {
  isLoading: boolean;
  currentPage: number;
  createdAt: "asc" | "desc";
  setCreatedAt: Dispatch<SetStateAction<"asc" | "desc">>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  fetchPayments: () => void;
}

const initialState: PaymentsDataContextProps = {
  payments: [],
  currentPage: 1,
  pageCount: 0,
  count: 0,
  setCreatedAt: () => {},
  setCurrentPage: () => {},
  createdAt: "desc",
  isLoading: true,
  fetchPayments: () => {},
};

const PaymentsDataContext = createContext<PaymentsDataContextProps>(initialState);

const PaymentsDataContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [createdAt, setCreatedAt] = useState<"desc" | "asc">("desc");

  const { accessToken } = getUserSession();

  const fetchPayments = async () => {
    setIsLoading(true);

    if (!accessToken) {
      return;
    }

    const data = await getPayments({ page: currentPage, pageSize: 10, createdAt }, accessToken!);

    if (!data) {
      return;
    }

    const { payments, pageCount, count } = data;

    if (!payments) {
      return;
    }

    setIsLoading(false);
    setPayments(payments);
    setPageCount(pageCount);
    setCount(count);
  };

  useEffect(() => {
    fetchPayments();
  }, [currentPage, accessToken]);

  return (
    <PaymentsDataContext.Provider
      value={{
        count,
        pageCount,
        payments,
        setCreatedAt,
        setCurrentPage,
        createdAt,
        currentPage,
        fetchPayments,
        isLoading,
      }}
    >
      {children}
    </PaymentsDataContext.Provider>
  );
};

export { PaymentsDataContext, PaymentsDataContextProvider };
