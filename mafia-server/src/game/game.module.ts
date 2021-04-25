import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ClientsModule, Transport } from '@nestjs/microservices';
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
import { ShotService } from './services/shot.service';
import { VoteService } from './services/vote.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player, Game, GameState, Vote, Shot]),
    EventEmitterModule.forRoot(),
    ClientsModule.register([
      { name: 'JANUS_SERVICE', transport: Transport.TCP },
    ]),
  ],
  exports: [TypeOrmModule],
  providers: [
    PlayerService,
    GameService,
    ShotService,
    VoteService,
    ShotListener,
    VoteListener,
    PlayerListener,
    GameListener,
    GameGateway,
  ],
})
export class GameModule {}
