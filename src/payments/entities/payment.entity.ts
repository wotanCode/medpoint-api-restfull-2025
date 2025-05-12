import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Appointment } from '../../appointments/entities/appointment.entity';

export enum PaymentStatus {
  pending = 'pending',
  completed = 'completed',
  failed = 'failed',
}

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Appointment)
  @JoinColumn({ name: 'appointment_id' })
  appointment: Appointment;

  @Column('float', { default: 100})
  amount: number;

  @Column({ type: 'timestamp', name: 'payment_time' })
  paymentTime: Date;

  @Column({ type: 'enum', enum: PaymentStatus })
  status: PaymentStatus;
}
