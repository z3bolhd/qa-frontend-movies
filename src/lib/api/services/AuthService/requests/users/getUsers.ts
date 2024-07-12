import queryString from "query-string";

import { AxiosCustomRequestConfig } from "@api/types";
import { GetUsersParams, GetUsersResponse } from "@lib/types";

import { AuthClient } from "../../client";

export type GetUsersConfig = AxiosCustomRequestConfig<GetUsersParams>;

export const getUsers = async ({ params, config }: GetUsersConfig) =>
  AuthClient.get<GetUsersResponse>(
    "/user?" + queryString.stringify(params, { skipNull: true }),
    config,
  );
