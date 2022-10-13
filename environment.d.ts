declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // NextAuth
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;
    }
  }
}
