import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GameState } from './gamestate.entity';
import { Player } from './player.entity';

@Entity()
export class Shot {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player, (player) => player.shots)
  player: Player;

  @ManyToOne(() => Player, (player) => player.shots_against)
  aim: Player;

  @ManyToOne(() => GameState, (state) => state.lastShooting)
  game_state: GameState;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;
}
