import { AuthContext } from "@context/AuthProvider";
import { useContext } from "react";

const useSession = () => {
  return useContext(AuthContext);
};

export default useSession;
