import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { GameState } from './entities/gamestate.entity';
import { Player } from './entities/player.entity';
import { Shot } from './entities/shot.entity';
import { Vote } from './entities/vote.entity';
import { GameService } from './services/game.service';
import { PlayerService } from './services/player.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player, Game, GameState, Vote, Shot]),
    EventEmitterModule.forRoot(),
  ],
  exports: [TypeOrmModule],
  providers: [PlayerService, GameService],
})
export class GameModule {}
