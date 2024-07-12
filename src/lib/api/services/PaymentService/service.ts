import * as paymentRequests from "./requests/payment";
import * as userRequests from "./requests/user";

export const PaymentService = {
  ...paymentRequests,
  ...userRequests,
};
