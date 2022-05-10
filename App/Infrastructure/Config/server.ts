import * as dotenv from 'dotenv';
dotenv.config();

export default {
  PORT: Number(process.env.PORT) || 8080,
  APP_NAME: process.env.APP_NAME,
  NODE_ENV: process.env.NODE_ENV,
  SECRET: process.env.SECRET,
  ENVIRONMENT: process.env.NODE_ENV,
};
