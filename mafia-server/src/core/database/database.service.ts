import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import databaseConfig from './database.config';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  private logger: Logger = new Logger(DatabaseService.name);

  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const options = {
      ...databaseConfig,
    };

    return options;
  }
}
