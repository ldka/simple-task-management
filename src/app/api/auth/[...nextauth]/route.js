import axios from "@/utils/axios";
// import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const res = await fetch("http://127.0.0.1:8000/sanctum/csrf-cookie", {
          method: "GET",
        });
        const setCookieHeader = res.headers.get("set-cookie");

        const cookies = setCookieHeader?.split(", ");
        let sessionKey = null;
        let xsrfToken = null;

        for (const cookie of cookies) {
          if (cookie.startsWith("laravel_session=")) {
            sessionKey = cookie.split("=")[1];
          } else if (cookie.startsWith("XSRF-TOKEN=")) {
            xsrfToken = cookie.split("=")[1];
          }

          if (sessionKey && xsrfToken) {
            break;
          }
        }
        const data = {
          email: credentials?.email,
          password: credentials?.password,
          host: credentials?.pathName,
        };
        const headers = new Headers({
          Cookie: `laravel_session=${sessionKey}`,
          "Content-Type": "application/json",
        });

        if (xsrfToken) {
          headers.append("X-XSRF-TOKEN", xsrfToken);
        }

        const options = {
          method: "POST",
          headers,
          body: JSON.stringify(data),
        };
        const payload = {
          headers: options.headers,
          email: credentials?.email,
          password: credentials?.password,
          host: credentials?.pathName,
        };
        const response = await axios
          .post("/login", payload)
          .then((response) => {
            response.data.data.user.token = response.data.data.access_token;
            return response.data.data.user;
          })
          .catch((error) => {
            let errorMessage = error.response.data.message;
            console.log(errorMessage)
            return { error: errorMessage };
          });

        return response;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, user }) {
      if (user) {
        token.user = user;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken;
        session.user = token.user;
      }
      return session;
    },
    async signIn({ user }) {
      if (user?.error) {
        throw new Error(user.error);
      }
      return true;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
