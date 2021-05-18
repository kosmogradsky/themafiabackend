import * as bcrypt from 'bcrypt';
import { Player } from 'src/game/entities/player.entity';
import { Lobby } from 'src/lobby/entities/lobby.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @OneToMany(() => Player, (player) => player.user)
  players: Player[];

  @ManyToOne(() => Lobby, (lobby) => lobby.users)
  lobby: Lobby;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
