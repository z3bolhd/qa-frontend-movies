"use client";

import { useState } from "react";
import { useQuery } from "react-query";

import { GetPaymentsParams } from "@lib/types";
import PaymentsTable from "./_components/Table";
import { getPayments } from "@lib/api";
import LoadingSpinner from "@components/LoadingSpinner";

const PaymentsPage = () => {
  const [paymentFilters, setPaymentFilters] = useState<GetPaymentsParams>({
    createdAt: "desc",
  });

  const { data, isLoading } = useQuery(["payments", paymentFilters], () =>
    getPayments(paymentFilters),
  );

  const paymentsResponse = data?.data;

  if (data?.status !== 200 || !paymentsResponse) {
    return <p className="text-xl mt-36">Что-то пошло не так</p>;
  }

  return (
    <div>
      <div>
        <h2 className="text-4xl">Платежи</h2>
      </div>

      {isLoading ? (
        <div className="mt-36">
          <LoadingSpinner size={50} />
        </div>
      ) : (
        <PaymentsTable paymentsResponse={paymentsResponse || []} setFilters={setPaymentFilters} />
      )}
    </div>
  );
};

export default PaymentsPage;
