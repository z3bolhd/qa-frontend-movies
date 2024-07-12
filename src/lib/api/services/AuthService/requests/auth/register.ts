import { AxiosCustomRequestConfig } from "@api/types";
import { AuthClient } from "../../client";
import { User } from "@lib/types";

type RegisterUser = {
  email: string;
  fullName: string;
  password: string;
  passwordRepeat: string;
};

export interface RegisterUserParams extends RegisterUser {}

export type RegisterUserConfig = AxiosCustomRequestConfig<RegisterUserParams>;

export const register = async ({ params, config }: RegisterUserConfig) =>
  AuthClient.post<User>(`/register`, params, config);
