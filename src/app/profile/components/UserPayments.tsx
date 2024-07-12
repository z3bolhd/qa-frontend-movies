import { Payment } from "@lib/types";
import { useEffect, useState } from "react";
import UserPaymentsTable from "./Table";
import { PaymentService } from "@api/services/PaymentService";

const UserPayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isError, setIsError] = useState(false);

  const fetchPayments = async () => {
    try {
      const { data: payments } = await PaymentService.getUserPayments({});

      setPayments(payments);
      setIsError(false);
    } catch (e) {
      setIsError(true);
    }
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
