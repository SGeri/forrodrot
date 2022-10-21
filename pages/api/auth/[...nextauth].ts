import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@server";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {
          label: "Felhasználónév",
          type: "text",
          placeholder: "felhasználónév",
        },
        password: { label: "Jelszó", type: "password", placeholder: "jelszó" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        try {
          const user = await prisma.user.findFirst({
            where: {
              email: credentials.username,
              password: credentials.password,
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
