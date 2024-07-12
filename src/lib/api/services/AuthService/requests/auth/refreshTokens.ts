import { AxiosCustomRequestConfig } from "@api/types";

import { AuthClient } from "../../client";

export type RefreshTokensUserConfig = AxiosCustomRequestConfig;

export const refreshTokens = async ({ config }: RefreshTokensUserConfig) =>
  AuthClient.get("/refresh-tokens", config);
