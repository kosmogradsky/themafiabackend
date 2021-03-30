import { IPlayer } from './player.interface';

export type Team = 'mafia' | 'civilians' | undefined;
export type GamePhase = 'day' | 'night' | 'voting' | 'created' | 'finished';

export class IVote {
  player: IPlayer;
  vote: IPlayer;
}

export class IShooting {
  player: IPlayer;
  shot: IPlayer;
}
export class IGameState {
  phase: GamePhase;
  lastVote: IVote[];
  lastShooting: IShooting[];
}
export class IGame {
  janusSession: string | undefined;
  videoRoom: string | undefined;
  day: number;
  winner: Team;
  players: IPlayer[];
  gameState: IGameState;
}
