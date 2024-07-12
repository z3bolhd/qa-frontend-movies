import { AxiosCustomRequestConfig } from "@api/types";
import { PaymentClient } from "../../client";
import { Payment } from "@lib/types";

type CardInfo = {
  cardNumber: string;
  cardHolder: string;
  securityCode: number;
  expirationDate: string;
};

export interface CreatePaymentParams {
  movieId: number;
  amount: number;
  card: CardInfo;
}

export type CreatePaymentConfig = AxiosCustomRequestConfig<CreatePaymentParams>;

export const createPayment = async ({ params, config }: CreatePaymentConfig) =>
  PaymentClient.post<Payment>(`/create`, params, config);
