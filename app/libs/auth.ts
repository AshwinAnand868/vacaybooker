import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from 'bcrypt';
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import prisma from "@/app/libs/prismadb";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string,
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
      CredentialsProvider({
        name: "credentials",
        credentials: {
          email: { label: "email", type: "text" },
          password: { label: "password", type: "text" },
        },
        async authorize(credentials: any) {
          if(!credentials?.email || !credentials?.password) {
              throw new Error('Invalid credentials');
          }
  
          // find the user with the email
          const user = await prisma.user.findUnique({
              where: {
                  email: credentials.email
              }
          });
  
          // is the user valid and if they have a password stored in db
          if(!user || !user?.hashedPassword) {
              throw new Error("Invalid credentials!");
          }
  
          // check if password entered is correct
          const isCorrectPassword = await bcrypt.compare(
              credentials.password,
              user.hashedPassword
          );
  
          if(!isCorrectPassword) {
              throw new Error('Invalid credentials!');
          }
  
          return user;
  
        }
      }),
    ],
    pages: {
      signIn: '/' // the login modal page is on the home page only as we click on sign up - there is no specific page for it
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
      strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET as string,
  };

