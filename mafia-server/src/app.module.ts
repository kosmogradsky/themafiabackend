import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './core/database/database.module';

import { GameModule } from './game/game.module';

@Module({
  imports: [DatabaseModule, GameModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
