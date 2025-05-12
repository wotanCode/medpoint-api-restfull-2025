import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';

export enum AppointmentStatus {
  scheduled = 'scheduled',
  paid = 'paid',
  confirmed = 'confirmed',
  cancelled = 'cancelled',
}

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'patient_id' })
  patient: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'doctor_id' })
  doctor: User;

  @Column({ type: 'timestamp', name: 'appointment_time' })
  appointmentTime: Date;

  @Column({ type: 'enum', enum: AppointmentStatus })
  status: AppointmentStatus;

  @Column({ type: 'boolean', name: 'payment_status' })
  paymentStatus: boolean;

  @Column({ type: 'text', nullable: true })
  reason?: string;
}
