import { AxiosCustomRequestConfig } from "@api/types";
import { AuthClient } from "../../client";
import { User } from "@lib/types";

export type LogoutUserConfig = AxiosCustomRequestConfig;

export const logout = async ({ config }: LogoutUserConfig) => AuthClient.get("/logout", config);
