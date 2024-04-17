import { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

import { BACKEND_URL_AUTH, JWT_SECRET } from "@lib/consts";

const getRefreshToken = async (token: JWT): Promise<JWT | null> => {
  const res = await fetch(BACKEND_URL_AUTH + "/refresh-tokens", {
    method: "GET",
    headers: {
      authorization: `Refresh ${token.refreshToken}`,
    },
    credentials: "include",
  });

  if (!res.ok) {
    return { ...token, error: "RefreshAccessTokenError" };
  }

  const response = await res.json();

  return {
    ...token,
    refreshToken: response.refreshToken,
    accessToken: response.accessToken,
    expiresIn: response.expiresIn,
  };
};

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  secret: JWT_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "test@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(BACKEND_URL_AUTH + "/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        if (!res.ok) {
          return;
        }

        const user = await res.json();

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }

      if (new Date().getTime() < token.expiresIn) {
        return token;
      }

      return (await getRefreshToken(token)) as JWT;
    },

    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.expiresIn = token.expiresIn;
      session.error = token.error;

      return session;
    },
  },
};
