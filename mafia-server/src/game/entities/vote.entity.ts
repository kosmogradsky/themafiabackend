import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GameState } from './gamestate.entity';
import { Player } from './player.entity';

@Entity({ name: 'vote' })
export class Vote {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Player, (player) => player.votes)
  player: Player;

  @ManyToOne(() => Player, (player) => player.votes_against)
  choice: Player;

  @ManyToOne(() => GameState, (state) => state.lastShooting)
  game_state: GameState;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;
}
