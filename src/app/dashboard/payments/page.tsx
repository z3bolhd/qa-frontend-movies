"use client";

import { useState } from "react";
import { useQuery } from "react-query";

import { GetPaymentsParams } from "@lib/types";
import PaymentsTable from "./_components/Table";

import { getUserSession } from "@hooks/getUserSession";
import { getPayments } from "@lib/api";
import LoadingSpinner from "@components/LoadingSpinner";

const PaymentsPage = () => {
  const [paymentFilters, setPaymentFilters] = useState<GetPaymentsParams>({
    createdAt: "desc",
  });

  const { accessToken } = getUserSession();

  const { data, isLoading } = useQuery(
    ["payments", paymentFilters],
    () => getPayments(paymentFilters, accessToken!),
    {
      enabled: !!accessToken,
    },
  );

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
        <PaymentsTable paymentsResponse={data!} setFilters={setPaymentFilters} />
      )}
    </div>
    // </PaymentsDataContextProvider>
  );
};

export default PaymentsPage;
