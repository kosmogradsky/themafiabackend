import { Module } from '@nestjs/common';

import { DatabaseModule } from './core/database/database.module';

import { GameModule } from './game/game.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LobbyModule } from './lobby/lobby.module';

@Module({
  imports: [DatabaseModule, GameModule, UserModule, AuthModule, LobbyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
