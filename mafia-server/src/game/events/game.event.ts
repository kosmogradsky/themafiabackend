import { IGame } from '../interfaces/game.interface';

export class JanusSessionCreated {
  game: IGame;
  janusSession: string;
}

export class JanusVideoRoomCreated {
  game: IGame;
  videoRoom: string;
}
