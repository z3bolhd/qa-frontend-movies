"use client";

import PaymentsTable from "./components/Table";
import { PaymentsDataContextProvider } from "@context/PaymentsDataContext";

const PaymentsPage = () => {
  return (
    <PaymentsDataContextProvider>
      <div>
        <div>
          <h2 className="text-4xl">Платежи</h2>
        </div>

        <PaymentsTable />
      </div>
    </PaymentsDataContextProvider>
  );
};

export default PaymentsPage;
