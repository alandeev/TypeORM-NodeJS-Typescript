import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne
} from 'typeorm';

import User from './User';

@Entity('perfils')
class Perfil {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  birthdate: Date;

  @Column()
  phone: string;

  @OneToOne(type => User) // eslint-disable-line
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Perfil;
