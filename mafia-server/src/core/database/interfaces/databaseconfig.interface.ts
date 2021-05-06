class IDatabaseCLI {
  migrationsDir: string;
}
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
  logger?: string;
  migrationsTableName: string;
  migrations: string[];
  cli: IDatabaseCLI;
}

export class IDatabaseConfig {
  development: IDatabaseConfigParameters;
  testing: IDatabaseConfigParameters;
  production: IDatabaseConfigParameters;
}
