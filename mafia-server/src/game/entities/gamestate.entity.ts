import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GamePhase } from '../interfaces/game.interface';
import { Shot } from './shot.entity';
import { Vote } from './vote.entity';

@Entity()
export class GameState {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phase: GamePhase;

  @OneToMany(() => Vote, (vote) => vote.game_state)
  lastVote: Vote[];

  @OneToMany(() => Shot, (shot) => shot.game_state)
  lastShooting: Shot[];
}
