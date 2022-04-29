declare module NodeJS {
  interface ProcessEnv {
    PORT: number;
    MONGO_DB_URI: string;
    AUTH0_CLIENT_ID: string;
    APP_SECRET_KEY: string;
    AUTH0_BASE_URL: string;
    AUTH0_ISSUER_BASE_URL: string;
    AUTH0_API_AUDIENCE: string;
    AUTH0_API_SECRET: string;
  }
}