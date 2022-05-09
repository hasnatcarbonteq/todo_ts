import * as dotenv from 'dotenv';
dotenv.config();

export default {
  mysql: {
    DB: process.env.DB_NAME,
    PORT: Number(process.env.DB_PORT) || 3306,
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    HOST: process.env.DB_HOST,
    DIALECT: process.env.DB_DIALECT,
  },
};
