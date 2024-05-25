import NextAuth from "next-auth/next";

import  CredentialsProvider  from "next-auth/providers/credentials";
import { prisma } from "@/prisma/prismaClient";
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions = {
    
    adapter: PrismaAdapter(prisma),
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID as string,
            clientSecret:process.env.GOOGLE_SECRET as string,
        }),
        GitHubProvider({
            clientId:process.env.GITHUB_ID as string,
            clientSecret:process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials : {
                email : { label: "Email", type: "string", placeholder: "marvellous obatale"},
                password : { label: "Password", type: "password" },
                username : { label: "username", type: "string", placeholder: "marvel"}
            },
            async authorize(credentials){
                //to check wether the user entered his/her email address and password
                if(!credentials?.email || !credentials?.password){
                    return console.error("Invalid credentials")
                }

                //to check is the user already exists
                const user = await prisma.user.findUnique({
                    where:{
                        email: credentials.email
                    }
                })

                // to check if no user was found
                if(!user || !user.hashedPassword){
                    return NextResponse.json({message: "email has not been registered"})
                }

                // check if password matches
                const passwordMatches = await bcrypt.compare(credentials.password, user.hashedPassword)

                // to check if it the password does not match
                if(!passwordMatches) {
                    return NextResponse.json({message:" password does not match"})
                }
                console.log(" logged in successfully");
                return user

            }
        }),
    ],
    callbacks : {
        async jwt({ token, user, account}){
            return { ...token, ...user, ...account}
        },
        async session({ session, token, account, user }){
            session.account = token
            return session
        }
    },
   
    secret: process.env.SECRETE,
    session:{
        strategy:"jwt",
    },
    debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST}

