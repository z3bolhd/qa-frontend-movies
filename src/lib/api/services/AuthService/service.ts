import * as authRequests from "./requests/auth";
import * as usersRequests from "./requests/users";

export const AuthService = {
  ...authRequests,
  ...usersRequests,
};
