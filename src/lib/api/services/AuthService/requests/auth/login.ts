import { AxiosCustomRequestConfig } from "@api/types";
import { AuthClient } from "../../client";
import { LoginResponse } from "@lib/types";

type LoginUser = {
  email: string;
  password: string;
};

export interface LoginUserParams extends LoginUser {}

export type LoginUserConfig = AxiosCustomRequestConfig<LoginUserParams>;

export const login = async ({ params, config }: LoginUserConfig) =>
  AuthClient.post<LoginResponse>(`/login`, params, config);
