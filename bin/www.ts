import dotenv from 'dotenv';
import server from '@http/Server';
import '@infrastructure/Database/mySqlConnection';
import logger from '@infrastructure/Logger';

dotenv.config();

const { PORT, APP_NAME } = process.env;

server.listen(PORT, () => logger.info(`[HTTP]: ${APP_NAME} listening on port ${PORT} `));
