const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;
// We are using sequelize as the ORM and the below sets up the database configuration for both local and Heroku
// deployment
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL); // connection variables provided by Heroku
} else {
  sequelize = new Sequelize( // local connection variables
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;
