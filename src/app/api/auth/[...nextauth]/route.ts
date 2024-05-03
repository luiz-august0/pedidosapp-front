import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        tenant: { label: "tenant", type: "text" }, 
        login: { label: "login", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials, req) {
        const response = await fetch("http://localhost:8080/api/v1/session/login", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            "X-Tenant": credentials?.tenant ?? ""
          },
          body: JSON.stringify({
            login: credentials?.login,
            password: credentials?.password,
          }),
        });

        const user = await response.json();

        if (user && response.ok) {
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.accessToken = user?.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      const userSession = {
        user: {
          id: token.user?.userId,
          login: token.user?.login,
          role: token.user?.role,
        }
      } 

      session = userSession as any;
      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
