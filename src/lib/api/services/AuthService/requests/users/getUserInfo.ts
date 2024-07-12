import { AxiosCustomRequestConfig } from "@api/types";
import { AuthClient } from "../../client";
import { User } from "@lib/types";

export type GetUserInfoConfig = AxiosCustomRequestConfig;

export const getUserInfo = async ({ config }: GetUserInfoConfig) =>
  AuthClient.get<User>(`/user/me`, config);
