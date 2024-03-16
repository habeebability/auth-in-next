import prisma from "@/lib/prisma";
import { AuthOptions } from "next-auth";
import { CredentialsProvider } from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "User Name",
          type: "text",
          placeholder: "Your User Name",
        },
        password: {
          label: "Password",
          type: "text",
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.username,
          },
        });

        if (!user) throw new Error("Username or password incorrect");

        const isPasswordCorrect = bcrypt.compare credentials?.password === user.password;
      },
    }),
  ],
};
