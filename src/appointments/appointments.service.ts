import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { User } from '../auth/entities/user.entity';
import { AppointmentStatus } from '../interfaces';
import { ValidRoles } from '../interfaces';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Crea una nueva cita médica con validaciones de horario y disponibilidad
  async create(createAppointmentDto: CreateAppointmentDto, patientId: string) {
    const { doctorId, appointmentTime, reason } = createAppointmentDto;
    
    // Validar que el doctor existe y tiene el rol de doctor
    const doctor = await this.userRepository.findOne({
      where: { id: doctorId }
    });
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    if (!doctor.role.includes(ValidRoles.doctor)) {
      throw new BadRequestException('The specified user is not a doctor');
    }

    // Validar que el paciente existe
    const patient = await this.userRepository.findOne({
      where: { id: patientId }
    });
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    const appointmentDate = new Date(appointmentTime);
    
    // Validar horario de atención (7:00-12:00 y 14:00-18:00)
    const hour = appointmentDate.getHours();
    const minute = appointmentDate.getMinutes();
    const timeInMinutes = hour * 60 + minute;
    
    const isWithinMorningHours = timeInMinutes >= 7 * 60 && timeInMinutes <= 12 * 60;
    const isWithinAfternoonHours = timeInMinutes >= 14 * 60 && timeInMinutes <= 18 * 60;
    
    if (!isWithinMorningHours && !isWithinAfternoonHours) {
      throw new BadRequestException(
        'Appointments can only be scheduled between 7:00 AM and 12:00 PM, or between 2:00 PM and 6:00 PM'
      );
    }

    // Verificar que no haya otra cita en el mismo horario
    const existingAppointment = await this.appointmentRepository.findOne({
      where: {
        doctor: { id: doctorId },
        appointmentTime: appointmentDate,
        status: AppointmentStatus.scheduled,
      },
    });

    if (existingAppointment) {
      throw new BadRequestException('There is already an appointment scheduled for this time');
    }

    // Crear la cita
    const appointment = this.appointmentRepository.create({
      doctor,
      patient,
      appointmentTime: appointmentDate,
      status: AppointmentStatus.scheduled,
      paymentStatus: false,
      reason,
    });

    return this.appointmentRepository.save(appointment);
  }

  // Obtiene todas las citas con información de doctor y paciente
  async findAll() {
    return this.appointmentRepository.find({
      relations: ['doctor', 'patient'],
    });
  }

  // Obtiene una cita específica por ID
  async findOne(id: string) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['doctor', 'patient'],
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    return appointment;
  }

  // Obtiene todas las citas de un paciente específico
  async findMine(userId: string) {
    return this.appointmentRepository.find({
      where: { patient: { id: userId } },
      relations: ['doctor'],
      order: { appointmentTime: 'DESC' },
    });
  }

  // Obtiene las citas del día para un doctor específico
  async findToday(doctorId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return this.appointmentRepository.find({
      where: {
        doctor: { id: doctorId },
        appointmentTime: Between(today, tomorrow),
      },
      relations: ['patient'],
      order: { appointmentTime: 'ASC' },
    });
  }
}
