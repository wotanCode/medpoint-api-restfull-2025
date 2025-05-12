import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { BadRequestException } from '@nestjs/common';

import { Appointment } from '../../appointments/entities/appointment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  username: string;

  @Column()
  password: string;

  @Column('text', {
    array: true,
    default: ['patient'],
  })
  role: string[];

  @Column({ name: 'full_name', length: 100 })
  fullName: string;

  @Column('bool', {})
  isActive: boolean

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

  // Relación con citas como paciente
  @OneToMany(() => Appointment, appointment => appointment.patient)
  appointmentsAsPatient: Appointment[];

  // Relación con citas como doctor
  @OneToMany(() => Appointment, appointment => appointment.doctor)
  appointmentsAsDoctor: Appointment[];

  // Verificamos uso de caracteres especiales
  @BeforeInsert()
  validateUserNameWithOutSpecialCharacters() {
    const validCharacters = /^[a-zA-Z0-9]+$/;

    if (!validCharacters.test(this.username)) {
      throw new BadRequestException('The username can only contain letters and numbers.');
    }
  }

  @BeforeUpdate()
  validateUserNameWithOutSpecialCharactersOnUpdate() {
    const validCharacters = /^[a-zA-Z0-9]+$/;

    if (!validCharacters.test(this.username)) {
      throw new BadRequestException('The username can only contain letters and numbers.');
    }
  }
}