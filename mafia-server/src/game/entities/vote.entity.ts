import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Player } from './player.entity';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player, (player) => player.votes)
  player: Player;

  @ManyToOne(() => Player, (player) => player.votes_against)
  choice: Player;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;
}
