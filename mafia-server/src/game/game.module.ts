import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { GameState } from './entities/gamestate.entity';
import { Player } from './entities/player.entity';
import { Shot } from './entities/shot.entity';
import { Vote } from './entities/vote.entity';
import { GameGateway } from './gateways/game.gateway';
import { GameListener } from './listeners/game.listener';
import { PlayerListener } from './listeners/player.listener';
import { ShotListener } from './listeners/shot.listener';
import { VoteListener } from './listeners/vote.listener';
import { GameService } from './services/game.service';
import { PlayerService } from './services/player.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player, Game, GameState, Vote, Shot]),
    EventEmitterModule.forRoot(),
  ],
  exports: [TypeOrmModule],
  providers: [
    PlayerService,
    GameService,
    ShotListener,
    VoteListener,
    PlayerListener,
    GameListener,
    GameGateway,
  ],
})
export class GameModule {}
