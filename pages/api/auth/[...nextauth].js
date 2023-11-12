import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../lib/prismadb';

export default NextAuth({
  adapter: { PrismaAdapter },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'example@email.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        const user = await prisma.user.findFirst({
          where: {
            email: email,
            password: password,
          },
        });

        if (user === null || user === undefined) {
          return null;
        } else {
          return user;
        }
      },
    }),
  ],
  database: process.env.DATABASE_URL,
  session: {
    strategy: 'jwt',
  },
  jwt: {},
  callbacks: {
    session: async ({ session, token }) => {
      session.user.id = token.id;
      return session;
    },
    jwt: async ({ user, token, account }) => {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
  },
  // pages: {
  //   signIn: '/auth/signin',
  // },
  events: {},
  secret: process.env.NEXTAUTH_SECRET,
  debug: false,
});
