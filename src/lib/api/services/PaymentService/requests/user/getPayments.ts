import queryString from "query-string";

import { AxiosCustomRequestConfig } from "@api/types";
import { PaymentClient } from "../../client";
import { GetPaymentsParams, GetPaymentsResponse } from "@lib/types";

export type GetPaymentsConfig = AxiosCustomRequestConfig<GetPaymentsParams>;

export const getPayments = async ({ params, config }: GetPaymentsConfig) =>
  PaymentClient.get<GetPaymentsResponse>(
    "/find-all?" + queryString.stringify(params, { skipNull: true }),
    config,
  );
