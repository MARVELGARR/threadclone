import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

import bcrypt from "bcrypt";
import { prisma } from "@/prisma/prismaClient";
import { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
declare module "next-auth" {
    interface Session {
      user: {
        id: string;
        name: string;
        email: string;
        image?: string;
      };
    }
  
    interface JWT {
      id: string;
    }
  }
  

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma) as unknown as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE as string,
            clientSecret: process.env.GOOGLE_SECRE as string,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email@example.com" },
                password: { label: "Password", type: "password" },
                username: { label: "Username", type: "text", placeholder: "your_username" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user || !user.hashedPassword) {
                    throw new Error("Email has not been registered");
                }

                const passwordMatches = await bcrypt.compare(credentials.password, user.hashedPassword);

                if (!passwordMatches) {
                    throw new Error("Password does not match");
                }

                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if(session.user){

                session.user.id = token.id as string;
            }
            return session;
        },
    },
    secret: process.env.SECRE,
    session: {
        strategy: "jwt",
    },
    debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
