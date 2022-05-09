import dotenv from 'dotenv';
import server from '@http/Server';
import '@infrastructure/Database/mySqlConnection';

dotenv.config();

const { PORT, APP_NAME } = process.env;

server.listen(PORT, () => console.log(`[HTTP]: ${APP_NAME} listening on port ${PORT} `));
