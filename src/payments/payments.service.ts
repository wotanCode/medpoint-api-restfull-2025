import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { Payment } from './entities/payment.entity';
import { Appointment } from '../appointments/entities/appointment.entity';
import { AppointmentStatus } from '../interfaces';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly configService: ConfigService,
  ) {
    const stripeKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
    }
    this.stripe = new Stripe(stripeKey, {
      apiVersion: '2025-04-30.basil',
    });
  }

  async processPayment(appointmentId: string, paymentMethod: string, paymentToken: string) {
    // Buscar la cita
    const appointment = await this.appointmentRepository.findOne({
      where: { id: appointmentId },
      relations: ['patient'],
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    if (appointment.isPaid) {
      throw new BadRequestException('Appointment is already paid');
    }

    try {
      // Crear el cargo en Stripe
      const charge = await this.stripe.charges.create({
        amount: Math.round(appointment.amount * 100), // Stripe usa centavos
        currency: 'usd',
        source: paymentToken,
        description: `Payment for appointment with Dr. ${appointment.doctor.fullName}`,
        metadata: {
          appointmentId: appointment.id,
          patientId: appointment.patient.id,
          doctorId: appointment.doctor.id,
        },
      });

      // Crear el registro de pago
      const payment = this.paymentRepository.create({
        amount: appointment.amount,
        paymentMethod,
        paymentId: charge.id,
        status: charge.status,
        appointment,
      });

      // Guardar el pago
      await this.paymentRepository.save(payment);

      // Actualizar el estado de la cita
      appointment.isPaid = true;
      appointment.status = AppointmentStatus.paid;
      appointment.paymentId = charge.id;
      appointment.paymentMethod = paymentMethod;
      appointment.paymentDate = new Date();
      await this.appointmentRepository.save(appointment);

      return {
        success: true,
        paymentId: charge.id,
        amount: appointment.amount,
        status: charge.status,
      };
    } catch (error) {
      // Crear registro de pago fallido
      const failedPayment = this.paymentRepository.create({
        amount: appointment.amount,
        paymentMethod,
        paymentId: 'failed',
        status: 'failed',
        errorMessage: error.message,
        appointment,
      });
      await this.paymentRepository.save(failedPayment);

      throw new BadRequestException(`Payment failed: ${error.message}`);
    }
  }

  async getPaymentDetails(paymentId: string) {
    // Primero intentar buscar por el ID de Stripe
    let payment = await this.paymentRepository.findOne({
      where: { paymentId },
      relations: ['appointment'],
    });

    // Si no se encuentra por el ID de Stripe, intentar por el UUID
    if (!payment) {
      payment = await this.paymentRepository.findOne({
        where: { id: paymentId },
        relations: ['appointment'],
      });
    }

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    return payment;
  }
}
