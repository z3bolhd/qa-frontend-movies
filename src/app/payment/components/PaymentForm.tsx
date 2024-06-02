import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { PaymentFormSchema, paymentFormSchema } from "./PaymentFormSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Button } from "@components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPayment } from "@lib/api";
import LoadingSpinner from "@components/LoadingSpinner";

interface PaymentFormProps {
  movieId: number;
  price: number;
  onSuccess: () => void;
}

const PaymentForm = ({ movieId, price, onSuccess }: PaymentFormProps) => {
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormSchema>({
    resolver: zodResolver(paymentFormSchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const total = price * watch("amount") || price;

  const onSubmit: SubmitHandler<PaymentFormSchema> = async (data) => {
    setIsLoading(true);
    const expirationDate = data.card.expirationMonth + "/" + data.card.expirationYear;

    const { status } = await createPayment({
      movieId: movieId,
      amount: data.amount,
      card: {
        ...data.card,
        expirationDate,
      },
    });

    switch (status) {
      case 201:
        toast.success("Оплата прошла успешно");
        onSuccess();
        break;
      case 400:
        toast.error("Неверные данные карты");
        break;
      case 404:
        toast.error("Фильм не найден");
        break;
      case 503:
        toast.error("Сервис временно недоступен");
        break;
      default:
        toast.error("Что-то пошло не так");
        break;
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="amount">Количество билетов</Label>
        <Input
          id="amount"
          type="number"
          min={1}
          defaultValue={1}
          max={5}
          {...register("amount", { valueAsNumber: true })}
        />
        {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
      </div>
      <div className="mt-5">
        <Label htmlFor="card.cardNumber">Номер карты</Label>

        <Input
          id="card.cardNumber"
          type="text"
          placeholder="1234123412341234"
          maxLength={16}
          {...register("card.cardNumber")}
        />
        {errors.card?.cardNumber && (
          <p className="text-red-500 text-sm">{errors.card?.cardNumber.message}</p>
        )}
      </div>

      <div className="mt-5">
        <Label>Владелец карты</Label>

        <Input
          id="card.cardholderName"
          type="text"
          placeholder="John Doe"
          {...register("card.cardHolder")}
        />
        {errors.card?.cardHolder && (
          <p className="text-red-500 text-sm">{errors.card?.cardHolder.message}</p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 mt-5">
        <div className="grid gap-2">
          <Label htmlFor="month">Месяц</Label>
          <Controller
            name="card.expirationMonth"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="month">
                  <SelectValue placeholder="Месяц" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="01">Январь</SelectItem>
                  <SelectItem value="02">Февраль</SelectItem>
                  <SelectItem value="03">Март</SelectItem>
                  <SelectItem value="04">Апрель</SelectItem>
                  <SelectItem value="05">Май</SelectItem>
                  <SelectItem value="06">Июнь</SelectItem>
                  <SelectItem value="07"> Июль</SelectItem>
                  <SelectItem value="08">Август</SelectItem>
                  <SelectItem value="09">Сентябрь</SelectItem>
                  <SelectItem value="10">Октябрь</SelectItem>
                  <SelectItem value="11">Ноябрь</SelectItem>
                  <SelectItem value="12">Декабрь</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          {errors.card?.expirationMonth && (
            <p className="text-red-500 text-sm">{errors.card?.expirationMonth.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="year">Год</Label>

          <Controller
            name="card.expirationYear"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="year">
                  <SelectValue placeholder="Год" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => (
                    <SelectItem key={i} value={`${new Date().getFullYear() + i}`.slice(2)}>
                      {new Date().getFullYear() + i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          {errors.card?.expirationYear && (
            <p className="text-red-500 text-sm">{errors.card?.expirationYear.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="cvc">Код</Label>
          <Input
            id="cvc"
            placeholder="CVC"
            minLength={3}
            maxLength={3}
            {...register("card.securityCode", { valueAsNumber: true })}
          />
          {errors.card?.securityCode && (
            <p className="text-red-500 text-sm">{errors.card?.securityCode.message}</p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <Label>Сумма к оплате</Label>
        <p className="text-3xl">{total}</p>
      </div>

      <div className="mt-5">
        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={isLoading}>
          {isLoading ? <LoadingSpinner size={16} /> : "Оплатить"}
        </Button>
      </div>
    </form>
  );
};

export default PaymentForm;
