import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env'), });

export const {
  PORT,
  AUTH_MODE,
  NODE_ENV,
  JWT_SECRET_KEY,
  JWT_TIME,
  POSTGRES_DBHOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env;
export const POSTGRES_PORT = Number(process.env);
