import { getUserPayments } from "@lib/api";
import { Payment } from "@lib/types";
import { useEffect, useState } from "react";
import UserPaymentsTable from "./Table";

const UserPayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isError, setIsError] = useState(false);

  const fetchPayments = async () => {
    const { data: payments } = await getUserPayments();

    if (!payments) {
      setIsError(true);
      return;
    }

    setIsError(false);

    setPayments(payments);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="my-10">
      <h2 className="text-4xl">Платежи</h2>

      {isError ? (
        <p className="text-xl mt-3">Произошла ошибка при получении платежей</p>
      ) : payments.length === 0 ? (
        <p className="text-xl mt-3">Вы еще не оплатили ни один билет</p>
      ) : (
        <UserPaymentsTable payments={payments} />
      )}
    </div>
  );
};

export default UserPayments;
