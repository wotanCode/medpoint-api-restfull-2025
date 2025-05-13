import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { Appointment } from '../../appointments/entities/appointment.entity';

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @ApiProperty()
  @Column('text', {
    select: false,
  })
  password: string;

  @ApiProperty()
  @Column('text', {
    array: true,
    default: ['patient'],
  })
  role: string[];

  @ApiProperty()
  @Column({ name: 'full_name', length: 100 })
  fullName: string;

  @ApiProperty()
  @Column('bool', { default: true })
  isActive: boolean

  @ApiProperty()
  @Column({ type: 'date', name: 'date_of_birth' })
  dateOfBirth: string;

  @ApiProperty()
  @Column({ length: 20, nullable: true })
  phone?: string;

  @ApiProperty()
  @Column({ length: 255, nullable: true })
  address?: string;

  // Relación con citas como paciente
  @ApiProperty()
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