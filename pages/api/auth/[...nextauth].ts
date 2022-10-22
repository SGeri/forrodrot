import NextAuth from "next-auth";
import crypto from "crypto";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@server";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "email",
        },
        password: { label: "Jelszó", type: "password", placeholder: "jelszó" },
      },

      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const hash = crypto
          .createHash("sha256")
          .update(credentials.password)
          .digest("hex");

        try {
          const user = await prisma.user.findFirst({
            where: {
              email: credentials.username,
              password: hash,
            },
          });

          if (!user) return null;

          return { id: user?.id, name: user?.name, email: user?.email };
        } catch (err) {
          return null;
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
