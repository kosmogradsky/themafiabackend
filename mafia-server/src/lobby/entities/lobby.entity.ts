import { Game } from 'src/game/entities/game.entity';
import { User } from 'src/user/entities/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LobbyStatus } from '../interfaces/lobby.interface';

@Entity()
export class Lobby {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'uuid', nullable: true })
  creator_id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  status: LobbyStatus;

  @OneToOne(() => Game, (game) => game.lobby)
  game: Game;

  @OneToMany(() => User, (user) => user.lobby)
  users: User[];

  @BeforeInsert()
  insertCreatorId() {
    this.creator_id = this.users[0].id;
  }
}
