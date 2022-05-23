import { Sequelize } from 'sequelize';
import config from '../Config';
import logger from '../Logger'

const { database } = config;
const mysql = database.mysql;

const sequelize = new Sequelize(mysql.DB, mysql.USERNAME, mysql.PASSWORD, {
  host: mysql.HOST,
  port: mysql.PORT,
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    logger.error(`[DB]: Connected to ${mysql.DB} at ${mysql.HOST}`);
  })
  .catch((err) => {
    logger.error('[DB]: Connection Error Database not connected', err.message);
    process.exit(1);
  });
sequelize.sync({ alter: true });

export default sequelize;
