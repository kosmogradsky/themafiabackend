import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GamePhase } from '../interfaces/game.interface';
import { Game } from './game.entity';
import { Shot } from './shot.entity';
import { Vote } from './vote.entity';

@Entity()
export class GameState {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar' })
  phase: GamePhase;

  @OneToMany(() => Vote, (vote) => vote.game_state)
  lastVote: Vote[];

  @OneToMany(() => Shot, (shot) => shot.game_state)
  lastShooting: Shot[];

  @OneToOne(() => Game, (game) => game.state)
  game: Game;
}
