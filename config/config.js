
module.exports = {
  development: {
    username: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || null,
    database: process.env.DATABASE_NAME || 'cenedb_dev',
    host: process.env.DATABASE_HOST || 'cenedata',
    dialect: 'mysql',
  },
  test: {
    username: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || null,
    database: process.env.DATABASE_NAME || 'cenedb_dev',
    host: process.env.DATABASE_HOST || 'cenedata',
    dialect: 'mysql',
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
  },
};
