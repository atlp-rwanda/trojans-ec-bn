require('dotenv').config()
const {
  PRODUCTION_DATABASE,
  DEV_DATABASE,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
  TEST_DATABASE_USER,
  TEST_DATABASE_PASSWORD,
  TEST_DATABASE,
  TEST_DATABASE_HOST,
  TEST_DATABASE_PORT,

} = process.env;


module.exports = {
  development: {
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DEV_DATABASE,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    dialect: 'postgres',
  },
  test: {
    username: TEST_DATABASE_USER,
    password: TEST_DATABASE_PASSWORD,
    database: TEST_DATABASE,
    host: TEST_DATABASE_HOST,
    port: TEST_DATABASE_PORT,
    dialect: 'postgres',
  },
  production: {
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: PRODUCTION_DATABASE,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    dialect: 'postgres',
  },
};

