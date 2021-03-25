import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Player } from './entities/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player, Game])],
  exports: [TypeOrmModule],
})
export class GameModule {}
