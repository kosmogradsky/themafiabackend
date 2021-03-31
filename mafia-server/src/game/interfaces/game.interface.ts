import { IPlayer } from './player.interface';

export type Team = 'mafia' | 'civilians' | undefined;
export type GamePhase = 'day' | 'night' | 'voting' | 'created' | 'finished';

export class IVote {
  player: IPlayer;
  choice: IPlayer;
  readonly created_at?: string;
}

export class IShot {
  player: IPlayer;
  aim: IPlayer;
  readonly created_at?: string;
}
export class IGameState {
  phase: GamePhase;
  lastVote: IVote[];
  lastShooting: IShot[];
}
export class IGame {
  janusSession: string | undefined;
  videoRoom: string | undefined;
  day: number;
  winner: Team;
  players: IPlayer[];
  state: IGameState;
}
