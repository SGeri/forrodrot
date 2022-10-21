declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // NextAuth
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;

      // Database
      DATABASE_URL: string;

      // Public Base URL
      PUBLIC_BASE_URL: string | undefined;
    }
  }
}
