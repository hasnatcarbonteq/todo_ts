import dotenv from 'dotenv';
import server from '@http/Server';
import '@infrastructure/Database/mySqlConnection';
import logger from '@infrastructure/Logger';
import commander from '@http/cli';

dotenv.config();

const { PORT, APP_NAME } = process.env;

commander(
  server.listen(PORT, () =>
    logger.info(`[HTTP]: ${APP_NAME} listening on port ${PORT} `),
  ),
);
