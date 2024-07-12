"use client";
import { createContext, useCallback, useEffect, useState } from "react";

import { AuthStatus, SignInRequest, SignInResponse, User } from "@lib/types";
import inMemoryJWT from "@lib/inMemoryJWT";

import { AuthService } from "@api/services/AuthService";

interface AuthContextProps {
  isLogged: boolean;
  signIn: (data: SignInRequest) => Promise<SignInResponse>;
  signOut: () => void;
  session: User | null;
}

const initialState: AuthContextProps = {
  isLogged: false,
  signIn: async () => ({
    status: AuthStatus.OK,
  }),
  signOut: () => {},
  session: null,
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps>(initialState);

function AuthProvider({ children }: AuthProviderProps) {
  const [isLogged, setIsLogged] = useState(false);
  const [session, setSession] = useState<AuthContextProps["session"]>(null);

  const signIn = async (credentials: SignInRequest) => {
    const { data, status } = await AuthService.login({ params: credentials });

    if (status === 200 && data) {
      inMemoryJWT.deleteToken();
      setIsLogged(true);
      inMemoryJWT.setToken(data.accessToken, data.expiresIn);
      setSession(data.user);
      return { status: AuthStatus.OK };
    }

    if (status === 401) {
      return { status: AuthStatus.UNAUTHORIZED };
    }

    if (status === 403) {
      return { status: AuthStatus.FORBIDDEN };
    }

    return { status: AuthStatus.ERROR };
  };

  const signOut = async () => {
    const data = await AuthService.logout({});
    if (data.status === 200) {
      inMemoryJWT.deleteToken();
      setIsLogged(false);
      setSession(null);
      return;
    }
  };

  const fetchUserData = useCallback(async () => {
    try {
      const { data } = await AuthService.getUserInfo({});
      setSession(data);
      setIsLogged(true);
    } catch (e) {
      inMemoryJWT.deleteToken();
      setIsLogged(false);
    }
  }, []);

  const refreshTokens = useCallback(async () => {
    try {
      const { data } = await AuthService.refreshTokens({});

      const { accessToken, expiresIn } = data;

      fetchUserData();

      inMemoryJWT.setToken(accessToken, expiresIn);
    } catch (e) {
      inMemoryJWT.deleteToken();
      setIsLogged(false);
    }
  }, [fetchUserData]);

  useEffect(() => {
    refreshTokens();
  }, [refreshTokens]);

  useEffect(() => {
    const handlePersistedLogOut = (event: StorageEvent) => {
      if (event.key === "logout") {
        inMemoryJWT.deleteToken();
        setIsLogged(false);
      }
    };

    window.addEventListener("storage", handlePersistedLogOut);

    return () => {
      window.removeEventListener("storage", handlePersistedLogOut);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged, signIn, signOut, session }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
