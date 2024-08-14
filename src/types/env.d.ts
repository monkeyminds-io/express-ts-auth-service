declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NODE_ENV: 'production' | 'development' | 'test';
    readonly PORT: string;
    readonly SERVER_URL: string;
    readonly API_PATH: string;
    readonly CORS_ORIGIN: string;
    readonly ACCESS_TOKEN_SECRET: string;
    readonly ACCESS_TOKEN_EXPIRE: string;
    readonly REFRESH_TOKEN_SECRET: string;
    readonly REFRESH_TOKEN_EXPIRE: string;
    readonly REFRESH_TOKEN_COOKIE_NAME: string;
    readonly PG_DATABASE: string;
    readonly PG_USER: string;
    readonly PG_PASSWORD: string;
    readonly DATABASE_URL: string;
    readonly SMTP_HOST: string;
    readonly SMTP_PORT: string;
    readonly SMTP_USERNAME: string;
    readonly SMTP_PASSWORD: string;
    readonly EMAIL_FROM: string;
  }
}
