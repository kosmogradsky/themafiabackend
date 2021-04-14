import { Game } from '../entities/game.entity';
import { Shot } from '../entities/shot.entity';
import { Vote } from '../entities/vote.entity';
import { GamePhase } from '../interfaces/game.interface';

export class GameStateDTO {
  readonly id?: number;
  phase?: GamePhase;
  lastVote?: Vote[];
  lastShooting?: Shot[];
  readonly game?: Game;
}
