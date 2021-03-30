import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../interfaces/player.interface';
import { Game } from './game.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  is_alive: boolean;

  @Column({ default: false })
  is_exposed: boolean;

  @Column({ default: 0 })
  fouls: number;

  @Column()
  role: Role;

  @ManyToOne(() => Game, (game) => game.players, { nullable: true })
  game: Game;
}
