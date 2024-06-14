const { Pool } = require('pg');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    schema: process.env.DB_SCHEMA,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    max: 20, // Maximum number of connections in the pool
    idleTimeoutMillis: 30000, // Time period (in milliseconds) after which idle connections are closed
    connectionTimeoutMillis: 2000 
  });

module.exports = pool;