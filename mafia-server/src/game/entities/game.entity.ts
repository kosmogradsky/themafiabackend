import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Team } from '../interfaces/game.interface';
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
}
