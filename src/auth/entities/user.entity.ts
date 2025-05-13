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

  @Column({ type: 'varchar', length: 100, unique: true })
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
  isActive: boolean

  @Column({ type: 'date', name: 'date_of_birth' })
  dateOfBirth: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ length: 255, nullable: true })
  address?: string;

  // Relación con citas como paciente
  @OneToMany(() => Appointment, appointment => appointment.patient)
  appointmentsAsPatient: Appointment[];

  // Relación con citas como doctor
  @OneToMany(() => Appointment, appointment => appointment.doctor)
  appointmentsAsDoctor: Appointment[];

  // Verificamos email
  @BeforeInsert()
  @BeforeUpdate()
  validateEmail() {
    this.email = this.email.toLowerCase().trim();
    const validCharacters = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email || !validCharacters.test(this.email)) {
      throw new BadRequestException('The email must be valid');
    }
  }
}