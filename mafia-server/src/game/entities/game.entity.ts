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
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', default: '' })
  janusSession: string;

  @Column({ type: 'varchar', default: '' })
  videoRoom: string;

  @Column({ type: 'int', default: 0 })
  day: number;

  @Column({ type: 'varchar', default: '' })
  winner: Team;

  @OneToMany(() => Player, (player) => player.game)
  players: Player[];

  @OneToOne(() => GameState, (state) => state.game)
  @JoinColumn()
  state: GameState;
}
