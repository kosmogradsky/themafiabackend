import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './core/database/database.module';

import { GameModule } from './game/game.module';
import { ApiModule } from './api/api.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LobbyModule } from './lobby/lobby.module';

@Module({
  imports: [DatabaseModule, GameModule, ApiModule, UserModule, AuthModule, LobbyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
