import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
        if (
          credentials?.username !== process.env.ADMIN_USERNAME ||
          credentials?.password !== process.env.ADMIN_PASSWORD
        )
          return null;

        return { email: process.env.ADMIN_EMAIL };
      },
    }),
  ],
};

export default NextAuth(authOptions);
