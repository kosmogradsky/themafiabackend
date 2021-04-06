import { IGame } from '../interfaces/game.interface';

export class JanusSessionCreatedEvent {
  game: IGame;
  janusSession: string;
}

export class JanusVideoRoomCreatedEvent {
  game: IGame;
  videoRoom: string;
}
