import { createConnection } from 'typeorm';
import { databaseConfig } from './ormconfig';

export const connectionToDatabase = async () => {
  try {
    createConnection(databaseConfig);
    console.log(`Database connected`);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};
