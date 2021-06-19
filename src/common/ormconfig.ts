import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';

dotenv.config();

const { TYPE } = process.env;
const { POSTGRES_DBHOST } = process.env;
const { POSTGRES_PORT } = process.env;
const { POSTGRES_USER } = process.env;
const { POSTGRES_PASSWORD } = process.env;
const { POSTGRES_DB } = process.env;

export const databaseConfig = {
  type: TYPE,
  host: POSTGRES_DBHOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
} as ConnectionOptions;
