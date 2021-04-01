import { IPlayer } from '../interfaces/player.interface';

export class PlayerKilledEvent {
  player: IPlayer;
}

export class FoulAssignedEvent {
  player: IPlayer;
}

export class PlayerKickedEvent {
  player: IPlayer;
}
