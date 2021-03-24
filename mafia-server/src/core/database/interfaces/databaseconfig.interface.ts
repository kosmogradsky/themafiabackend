export class IDatabaseConfigParameters {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  entities: string[];
  synchronize: boolean;
  logging: boolean | string[];
  autoLoadEntities: boolean;
  logger?: string; //TODO: implement custom Nest.js logger for TypeORM
}

export class IDatabaseConfig {
  development: IDatabaseConfigParameters;
  testing: IDatabaseConfigParameters;
  production: IDatabaseConfigParameters;
}
