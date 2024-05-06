import { sessionLogin } from '@/core/auth/services/auth';
import NextAuth, { NextAuthOptions, SessionStrategy } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        tenant: { label: 'tenant', type: 'text' },
        login: { label: 'login', type: 'text' },
        password: { label: 'password', type: 'password' },
      },

      async authorize(credentials, req) {
        try {          
          const sessionResponse = await sessionLogin({
            tenant: credentials?.tenant ?? '',
            login: credentials?.login ?? '',
            password: credentials?.password ?? '',
          });

          if (sessionResponse) {
            return sessionResponse;
          }
  
          return null;
        } catch (error) {
          throw new Error(JSON.stringify(error?.response?.data))
        }

      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user}
    },
    async session({ session, token }) {
      session.user = token as any;
      return session
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, nextAuthOptions, handler as POST };
