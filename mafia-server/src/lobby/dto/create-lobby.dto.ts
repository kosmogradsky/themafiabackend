import { IUser } from 'src/user/interfaces/user.interface';
export class CreateLobbyDto {
  name: string;
  users: IUser[];
}
