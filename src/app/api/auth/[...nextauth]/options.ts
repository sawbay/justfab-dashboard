import { createUserOrUpdate } from "@/utils/prisma";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { objectToAuthDataMap, AuthDataValidator } from "@telegram-auth/server";
import { BOT_TOKEN } from "@/utils/env";

export interface User {
  id: string;
  name: string;
  image: string;
  email: string;
  futurepass: string | null;
}

declare module "next-auth" {
  interface Session {
    user: User;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "telegram-login",
      name: "Telegram Login",
      credentials: {},
      async authorize(credentials, req): Promise<any | null> {
        const validator = new AuthDataValidator({
          botToken: BOT_TOKEN,
        });

        const data = objectToAuthDataMap(req.query || {});
        const user = await validator.validate(data);

        if (user.id && user.first_name) {
          const returned = {
            id: user.id,
            email: user.id.toString(),
            name: [user.first_name, user.last_name || ""].join(" "),
            image: user.photo_url,
            futurepass: null,
          };

          try {
            await createUserOrUpdate(user);
            console.log(user);
          } catch (err) {
            console.error(`Something went wrong while creating the user.${err}`);
          }

          return returned;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      session.user.id = session.user.email;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
}; 