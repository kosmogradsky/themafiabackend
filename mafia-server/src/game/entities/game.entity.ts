import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from '../interfaces/game.interface';
import { GameState } from './gamestate.entity';
import { Player } from './player.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  janusSession: string;

  @Column()
  videoRoom: string;

  @Column({ default: 0 })
  day: number;

  @Column()
  winner: Team;

  @OneToMany(() => Player, (player) => player.game)
  players: Player[];

  @OneToOne(() => GameState)
  @JoinColumn()
  state: GameState;
}
