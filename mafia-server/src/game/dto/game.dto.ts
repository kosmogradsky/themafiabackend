import { Team } from '../interfaces/game.interface';

export class GameDTO {
  readonly id?: number;
  janusSession?: string;
  videoRoom?: string;
  day?: number;
  winner?: Team;
}
