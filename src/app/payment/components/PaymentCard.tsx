"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { Movie } from "@lib/types";
import PaymentForm from "./PaymentForm";
import { useState } from "react";
import PaymentSuccessCard from "./PaymentSuccessCard";

interface PaymentCardProps extends Movie {}

const PaymentCard = ({ name, id, price }: PaymentCardProps) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const onSuccess = () => {
    setIsSuccess(true);
  };

  if (isSuccess) {
    return <PaymentSuccessCard />;
  }

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Покупка билета</CardTitle>
        <CardDescription className="text-base">{name}</CardDescription>
      </CardHeader>
      <CardContent>
        <PaymentForm movieId={id} price={price} onSuccess={onSuccess} />
      </CardContent>
    </Card>
  );
};

export default PaymentCard;
