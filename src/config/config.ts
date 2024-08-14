import * as dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

dotenv.config({
  path: path.resolve(__dirname, '../../.env')
});

const envSchema = Joi.object().keys({
  NODE_ENV: Joi.string()
    .valid('production', 'development', 'test')
    .required()
    .default('development'),
  PORT: Joi.string().required().default('4000'),
  SERVER_URL: Joi.string().required().default('http://localhost:4000'),
  API_PATH: Joi.string().required().default('/api/v1'),
  CORS_ORIGIN: Joi.string().required().default('*'),
  ACCESS_TOKEN_SECRET: Joi.string().min(8).required(),
  ACCESS_TOKEN_EXPIRE: Joi.string().required().default('20m'),
  REFRESH_TOKEN_SECRET: Joi.string().min(8).required(),
  REFRESH_TOKEN_EXPIRE: Joi.string().required().default('1d'),
  REFRESH_TOKEN_COOKIE_NAME: Joi.string().required().default('jid'),
  // TODO Set PostgreSQL DB connection params here and in .env file
  PG_DATABASE: Joi.string().required(),
  PG_USER: Joi.string().required(),
  PG_PASSWORD: Joi.string().required(),
  DATABASE_URL: Joi.string().required(),
  SMTP_HOST: Joi.string().required(),
  SMTP_PORT: Joi.string().default('587'),
  SMTP_USERNAME: Joi.string().required(),
  SMTP_PASSWORD: Joi.string().required(),
  EMAIL_FROM: Joi.string().email().required()
});

const { value: validatedEnv, error } = envSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env, { abortEarly: false, stripUnknown: true });

if (error) {
  throw new Error(
    `Environment variable validation error: \n${error.details
      .map((detail) => detail.message)
      .join('\n')}`
  );
}

const config = {
  node_env: validatedEnv.NODE_ENV,
  server: {
    port: validatedEnv.PORT,
    url: validatedEnv.SERVER_URL,
    api_path: validatedEnv.API_PATH
  },
  cors: {
    cors_origin: validatedEnv.CORS_ORIGIN
  },
  jwt: {
    access_token: {
      secret: validatedEnv.ACCESS_TOKEN_SECRET,
      expire: validatedEnv.ACCESS_TOKEN_EXPIRE
    },
    refresh_token: {
      secret: validatedEnv.REFRESH_TOKEN_SECRET,
      expire: validatedEnv.REFRESH_TOKEN_EXPIRE,
      cookie_name: validatedEnv.REFRESH_TOKEN_COOKIE_NAME
    }
  },
  email: {
    smtp: {
      host: validatedEnv.SMTP_HOST,
      port: validatedEnv.SMTP_PORT,
      auth: {
        username: validatedEnv.SMTP_USERNAME,
        password: validatedEnv.SMTP_PASSWORD
      }
    },
    from: validatedEnv.EMAIL_FROM
  }
} as const;

export default config;
