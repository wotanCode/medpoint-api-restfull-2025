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

  @Column({ unique: true, length: 100, nullable: true })
  email: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @Column('text', {
    array: true,
    default: ['patient'],
  })
  role: string[];

  @Column({ name: 'full_name', length: 100 })
  fullName: string;

  @Column('bool', { default: true })
  isActive?: boolean

  @Column({ type: 'date', name: 'date_of_birth' })
  dateOfBirth: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

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
  validateEmail() {
    const validCharacters = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!validCharacters.test(this.email)) {
      throw new BadRequestException('The email need be a valid email');
    }
  }

  @BeforeUpdate()
  validateEmailOnUpdate() {
    const validCharacters = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;;

    if (!validCharacters.test(this.email)) {
      throw new BadRequestException('The email need be a valid email');
    }
  }
}