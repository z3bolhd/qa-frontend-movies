import { getUserSession } from "@hooks/getUserSession";
import { getUserPayments } from "@lib/api";
import { Payment } from "@lib/types";
import { useEffect, useState } from "react";
import UserPaymentsTable from "./Table";

const UserPayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const { accessToken } = getUserSession();

  const fetchPayments = async () => {
    const payments = await getUserPayments(accessToken!);

    console.log(payments);

    if (!payments) {
      return;
    }

    setPayments(payments);
  };

  useEffect(() => {
    fetchPayments();
  }, [accessToken]);

  return (
    <div className="my-10">
      <h2 className="text-4xl">Платежи</h2>

      {payments.length === 0 ? (
        <p className="text-xl">Вы еще не оплатили ни один билет</p>
      ) : (
        <UserPaymentsTable payments={payments} />
      )}
    </div>
  );
};

export default UserPayments;
