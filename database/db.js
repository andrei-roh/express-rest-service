const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
    operatorsAliases: false,
  },
);

sequelize.authenticate().then(
  () => {
    console.log('Connected to DB');
  },

  (err) => {
    console.log(`Error: ${err}`);
  },
);

module.exports = sequelize;
