import { IPlayer } from './player.interface';

export type Team = 'mafia' | 'civilians' | undefined;
export type GamePhase = 'day' | 'night' | 'voting' | 'created' | 'finished';

export class IVote {
  id: number;
  player: IPlayer;
  choice: IPlayer;
  readonly created_at?: string;
}

export class IShot {
  id: number;
  player: IPlayer;
  aim: IPlayer;
  readonly created_at?: string;
}
export class IGameState {
  id: number;
  phase: GamePhase;
  lastVote: IVote[];
  lastShooting: IShot[];
}
export class IGame {
  id: number;
  janusSession: string | undefined;
  videoRoom: string | undefined;
  day: number;
  winner: Team;
  players: IPlayer[];
  state: IGameState;
}
