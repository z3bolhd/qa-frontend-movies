import { AxiosCustomRequestConfig } from "@api/types";
import { User } from "@lib/types";

import { AuthClient } from "../../client";

export interface EditUserParams extends Pick<User, "id" | "verified" | "roles" | "banned"> {}

export type EditUserConfig = AxiosCustomRequestConfig<EditUserParams>;

export const editUser = async ({ params, config }: EditUserConfig) =>
  AuthClient.patch<User>(`/user/${params.id}`, params, config);
