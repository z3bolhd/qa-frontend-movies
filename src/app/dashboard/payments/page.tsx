"use client";

import { useState } from "react";
import { useQuery } from "react-query";

import { GetPaymentsParams } from "@lib/types";
import PaymentsTable from "./_components/Table";

import LoadingSpinner from "@components/LoadingSpinner";
import { PaymentService } from "@api/services/PaymentService";

const PaymentsPage = () => {
  const [paymentFilters, setPaymentFilters] = useState<GetPaymentsParams>({
    createdAt: "desc",
  });

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery(["payments", paymentFilters], () =>
    PaymentService.getPayments({ params: paymentFilters }),
  );

  if (isError && !isLoading && !response?.data) {
    return <p className="text-xl mt-36 text-center">Что-то пошло не так</p>;
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
        <PaymentsTable paymentsResponse={response!.data || []} setFilters={setPaymentFilters} />
      )}
    </div>
  );
};

export default PaymentsPage;
