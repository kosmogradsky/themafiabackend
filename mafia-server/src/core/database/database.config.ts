import { IDatabaseConfig } from './interfaces/databaseconfig.interface';

const databaseConfig: IDatabaseConfig = {
  development: {
    type: 'postgres',
    host: process.env.POSTGRESQL_HOST_DEV,
    port: Number(process.env.POSTGRESQL_PORT_DEV),
    username: process.env.POSTGRESQL_USER_DEV,
    password: process.env.POSTGRESQL_PASSWORD_DEV,
    database: process.env.POSTGRESQL_DB_DEV,
    entities: [],
    synchronize: true,
    logging: true,
    autoLoadEntities: true,
  },
  testing: {
    type: 'postgres',
    host: process.env.POSTGRESQL_HOST_TEST,
    port: Number(process.env.POSTGRESQL_PORT_TEST),
    username: process.env.POSTGRESQL_USER_TEST,
    password: process.env.POSTGRESQL_PASSWORD_TEST,
    database: process.env.POSTGRESQL_DB_TEST,
    entities: [],
    synchronize: false,
    logging: true,
    autoLoadEntities: true,
  },
  production: {
    type: 'postgres',
    host: process.env.POSTGRESQL_HOST,
    port: Number(process.env.POSTGRESQL_PORT),
    username: process.env.POSTGRESQL_USER,
    password: process.env.POSTGRESQL_PASSWORD,
    database: process.env.POSTGRESQL_DB,
    entities: [],
    synchronize: false,
    logging: true, //["error"]
    autoLoadEntities: true,
  },
};

export default databaseConfig[process.env.NODE_ENV || 'development'];
