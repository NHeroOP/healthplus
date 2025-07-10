import NextAuth from "next-auth";

import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import connectDB from "@/server/connectDB";
import UserModel from "@/server/model/User.model";

import { compare } from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Google,
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        isVerifiedLogin: { type: "boolean", required: false },
      },
      authorize: async (credentials: any): Promise<any> => {
        await connectDB();

        try {
          const user = await UserModel.findOne({
            email: credentials.identifier,
          });

          if (credentials.isVerifiedLogin) {
            if (user && user.isVerified) {
              return user; // Directly return the user if found and verified
            }
            throw new Error("User not found or not verified for direct login.");
          }

          if (!user) {
            throw new Error("User not found with this email");
          }

          if (!user.isVerified) {
            throw new Error("Please verify before login");
          }

          const isPassCorrect = await compare(
            credentials.password,
            user.password
          );

          if (!isPassCorrect) {
            throw new Error("Incorrect Password");
          }

          return user;
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = String(user._id);
        token.username = user.username;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.phone = user.phone;
        token.isVerified = user.isVerified;
      }

      return token;
    },
    async session({ session, token }) {
      session.user._id = token._id as string;
      session.user.firstName = token.firstName as string;
      session.user.lastName = token.lastName as string;
      session.user.phone = token.phone as string;
      session.user.username = token.username as string;
      session.user.isVerified = token.isVerified as boolean;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});
