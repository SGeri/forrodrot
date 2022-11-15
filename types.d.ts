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

      // Spreadsheet
      PARTICIPANTS_SPREADSHEET_ID: string | undefined;
    }
  }
}

declare module "public-google-sheets-parser" {
  export default class PublicGoogleSheetsParser {
    constructor(spreadsheetId: string);
    parse(): Promise<any>;
  }
}
