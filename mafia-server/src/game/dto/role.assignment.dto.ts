import { IPlayer, Role } from '../interfaces/player.interface';

export class RoleAssignmentDTO {
  player: IPlayer;
  r_hash: Role; //role as a hash
}
