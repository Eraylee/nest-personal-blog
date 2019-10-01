import * as path from 'path';

export default {
  type: process.env.DATA_BASE_TYPE,
  host: process.env.DATA_BASE_HOST,
  port: Number(process.env.DATA_BASE_PORT),
  database: process.env.DATA_BASE_DB,
  username: process.env.DATA_BASE_USER,
  password: process.env.DATA_BASE_PWD,
  entities: [
    `${path.resolve(__dirname, '..')}${String(process.env.DATA_BASE_ENTITIES)}`,
  ],
  synchronize: true,
};
