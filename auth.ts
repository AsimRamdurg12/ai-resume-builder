import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { dbConnect } from "./lib/dbConnect";
import UserModel from "./models/UserModel";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "user@example.com",
        },
        password: {
          label: "Password",
          type: "text",
          placeholder: "Enter your password",
        },
      },
      authorize: async (credentials): Promise<any> => {
        await dbConnect();
        try {
          const user = await UserModel.findOne({ email: credentials?.email });

          if (!user) {
            return Response.json(
              {
                success: false,
                message: "User doesn't exists",
              },
              { status: 404 }
            );
          }

          const isValidPassword = await bcrypt.compare(
            credentials?.password as string,
            user?.password
          );

          if (!isValidPassword) {
            return Response.json(
              {
                success: false,
                message: "Invalid Password",
              },
              { status: 401 }
            );
          }

          return user;
        } catch (error) {}
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
    signIn: async ({ account, profile }) => {
      if (account?.provider === "google" || account?.provider === "github") {
        await dbConnect();

        const user = await UserModel.findOne({ email: profile?.email });

        if (!user) {
          const newUser = await UserModel.create({
            name: `${profile?.name} ${profile?.family_name}`,
            email: profile?.email,
          });

          await newUser.save();
        }

        return true;
      }
      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    },
  },
  pages: {
    signIn: "/sign-in",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.AUTH_SECRET,
});
