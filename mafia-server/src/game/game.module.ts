import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Player } from './entities/player.entity';
import { GameService } from './services/game.service';
import { PlayerService } from './services/player.service';

@Module({
  imports: [TypeOrmModule.forFeature([Player, Game])],
  exports: [TypeOrmModule],
  providers: [PlayerService, GameService],
})
export class GameModule {}
