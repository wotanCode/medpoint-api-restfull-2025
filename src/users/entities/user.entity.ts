import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

import { ValidRoles } from '../../interfaces';
// import { Doctor } from './doctor.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ValidRoles })
  role: ValidRoles;

  @Column({ name: 'full_name', length: 100 })
  fullName: string;

  @Column({ type: 'date', name: 'date_of_birth' })
  dateOfBirth: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ length: 100, nullable: true })
  email?: string;

  @Column({ length: 255, nullable: true })
  address?: string;

  @Column({ nullable: true })
  token?: string;

  @Column({ type: 'timestamp', name: 'token_created_at', nullable: true })
  tokenCreatedAt?: Date;

  // @OneToOne(() => Doctor, doctor => doctor.user)
  // doctor?: Doctor;
}
