import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../interfaces/player.interface';
import { Game } from './game.entity';
import { Shot } from './shot.entity';
import { Vote } from './vote.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'boolean', default: true })
  is_alive: boolean;

  @Column({ type: 'boolean', default: false })
  is_exposed: boolean;

  @Column({ type: 'int', default: 0 })
  fouls: number;

  @Column({ type: 'varchar', default: '' })
  role: Role;

  @ManyToOne(() => Game, (game) => game.players, { nullable: true })
  game: Game;

  @OneToMany(() => Vote, (vote) => vote.player)
  votes: Vote[];

  @OneToMany(() => Vote, (vote) => vote.choice)
  votes_against: Vote[];

  @OneToMany(() => Shot, (shot) => shot.player)
  shots: Shot[];

  @OneToMany(() => Shot, (shot) => shot.aim)
  shots_against: Shot[];

  @ManyToOne(() => User, (user) => user.players)
  user: User;
}
