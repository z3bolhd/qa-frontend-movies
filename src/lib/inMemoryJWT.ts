import { AuthClient } from "@clients/AuthClient";

const inMemoryJWTService = () => {
  let inMemoryJWT: string | null = null;
  let refreshTimeoutId: NodeJS.Timeout | number | null = null;

  const refreshToken = (expiresIn: number) => {
    const timeoutTrigger = expiresIn - new Date().getTime();

    refreshTimeoutId = setTimeout(() => {
      AuthClient.get("/refresh-tokens")
        .then((res) => {
          const { accessToken, expiresIn } = res.data;
          setToken(accessToken, expiresIn);
        })
        .catch(console.error);
    }, timeoutTrigger);
  };

  const abortRefreshToken = () => {
    if (refreshTimeoutId) {
      clearTimeout(refreshTimeoutId);
    }
  };

  const getToken = () => inMemoryJWT;

  const setToken = (token: string, expiresIn: number) => {
    inMemoryJWT = token;
    refreshToken(expiresIn);
  };

  const deleteToken = () => {
    inMemoryJWT = null;
    abortRefreshToken();
    localStorage.setItem("logout", Date.now().toString());
  };

  return {
    getToken,
    setToken,
    deleteToken,
  };
};

export default inMemoryJWTService();
