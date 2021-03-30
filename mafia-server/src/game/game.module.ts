import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Player } from './entities/player.entity';
import { PlayerService } from './services/player.service';

@Module({
  imports: [TypeOrmModule.forFeature([Player, Game])],
  exports: [TypeOrmModule],
  providers: [PlayerService],
})
export class GameModule {}
