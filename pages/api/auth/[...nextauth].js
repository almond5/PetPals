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
      async authorize(credentials) {
        const { email, password } = credentials;

        if (email === null || password === null) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            email: email,
            password: password,
          },
        });

        if (user.password !== password) {
          return null;
        }

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
  callbacks: {},
  pages: {
    signIn: '/auth/signin',
  },
  events: {},
  secret: process.env.NEXTAUTH_SECRET,
  debug: false,
});
