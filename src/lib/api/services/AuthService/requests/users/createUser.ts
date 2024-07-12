import { AxiosCustomRequestConfig } from "@api/types";
import { User } from "@lib/types";

import { AuthClient } from "../../client";

export interface CreateUserParams extends Omit<User, "id" | "roles" | "createdAt"> {
  password: string;
}

export type CreateUserConfig = AxiosCustomRequestConfig<CreateUserParams>;

export const createUser = async ({ params, config }: CreateUserConfig) =>
  AuthClient.post<User>(`/user`, params, config);
