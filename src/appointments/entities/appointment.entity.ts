import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '../../auth/entities/user.entity';
import { Payment } from '../../payments/entities/payment.entity';

import { AppointmentStatus } from 'src/interfaces';

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

  // Relación con el pago
  @OneToOne(() => Payment, payment => payment.appointment)
  payment: Payment;
}
