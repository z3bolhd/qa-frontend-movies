import { AxiosCustomRequestConfig } from "@api/types";
import { Payment } from "@lib/types";

import { PaymentClient } from "../../client";

export type GetUserPaymentsConfig = AxiosCustomRequestConfig;

export const getUserPayments = async ({ config }: GetUserPaymentsConfig) =>
  PaymentClient.get<Payment[]>(`/user`, config);
