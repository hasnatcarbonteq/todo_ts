import { Sequelize } from 'sequelize';
import config from '../Config';

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
    console.log(`[DB]: Connected to ${mysql.DB} at ${mysql.HOST}`);
  })
  .catch((err) => {
    console.log('[DB]: Connection Error Database not connected', err.message);
    process.exit(1);
  });
sequelize.sync({ alter: true });

// sequelize.addHook('beforeCount', function (options) {
//   if (this._scope.include && this._scope.include.length > 0) {
//     throw new Error(
//       'A "count" operation executed with scope-based inclusions will return an incorrect result',
//     );
//   }

//   if (options.include && options.include.length > 0) {
//     options.include = null;
//   }
// });

export default sequelize;
