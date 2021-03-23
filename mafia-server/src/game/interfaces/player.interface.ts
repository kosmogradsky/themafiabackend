export type MafiaRole = 'mafia' | 'godfather';
export type CivilianRole = 'civilian' | 'sheriff';
export type Role = MafiaRole | CivilianRole | 'narrator';

export class Player {
  //TODO: link with User once it's ready
  name: string;
  is_alive: boolean;
  is_exposed: boolean;
  fouls: number;
  role: Role;
}
