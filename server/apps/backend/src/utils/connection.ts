import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import entities from '../entity';
import { Logger } from '@nestjs/common';

dotenv.config();

const connection = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: entities,
  synchronize: true,
});

connection
  .initialize()
  .then(() => {
    Logger.log('Data Source has been initialized!', 'ConnectionDB');
  })
  .catch(() => {
    Logger.error('Error during Data Source initialization', 'ConnectionDB');
  });

export { connection };
