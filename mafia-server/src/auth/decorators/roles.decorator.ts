import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/game/interfaces/player.interface';

type RoleOrPlaceholder = Role | 'player_or_narrator';

export const Roles = (...roles: RoleOrPlaceholder[]) =>
  SetMetadata('roles', roles);
