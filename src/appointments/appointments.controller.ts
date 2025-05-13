import { Controller, Get, Post, Body, Patch, Param, Request } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Auth, GetUser } from '../auth/decorators';
import { ValidRoles } from '../interfaces';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '../auth/entities/user.entity';

@ApiTags('Citas Médicas')
@ApiBearerAuth()
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  /**
   * Crea una nueva cita médica (solo pacientes)
   * Valida el horario de la cita y la disponibilidad del doctor
   */
  @Post()
  @Auth(ValidRoles.patient)
  @ApiOperation({ 
    summary: 'Crear nueva cita médica',
    description: 'Crea una nueva cita con un doctor. Solo disponible para pacientes.'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Cita creada exitosamente',
    type: 'Appointment'
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Horario inválido o doctor no disponible' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Doctor o paciente no encontrado' 
  })
  create(@Body() createAppointmentDto: CreateAppointmentDto, @GetUser() user: User) {
    return this.appointmentsService.create(createAppointmentDto, user.id);
  }

  /**
   * Obtiene todas las citas del paciente actual
   * Solo los pacientes pueden acceder a sus propias citas
   */
  @Get('mine')
  @Auth(ValidRoles.patient)
  @ApiOperation({ 
    summary: 'Obtener citas del paciente',
    description: 'Obtiene todas las citas del paciente autenticado'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de citas obtenida exitosamente',
    type: '[Appointment]'
  })
  findMine(@GetUser() user: User) {
    return this.appointmentsService.findMine(user.id);
  }

  /**
   * Obtiene las citas del día para el doctor actual
   * Solo los doctores pueden acceder a sus citas del día
   */
  @Get('today')
  @Auth(ValidRoles.doctor)
  @ApiOperation({ 
    summary: 'Obtener citas del día',
    description: 'Obtiene todas las citas programadas para hoy del doctor autenticado'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de citas del día obtenida exitosamente',
    type: '[Appointment]'
  })
  findToday(@GetUser() user: User) {
    return this.appointmentsService.findToday(user.id);
  }

  /**
   * Obtiene los detalles de una cita específica
   * Cualquier usuario autenticado puede acceder a los detalles de una cita
   */
  @Get(':id')
  @Auth()
  @ApiOperation({ 
    summary: 'Obtener detalles de cita',
    description: 'Obtiene información detallada de una cita específica'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Detalles de la cita obtenidos exitosamente',
    type: 'Appointment'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Cita no encontrada' 
  })
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(id);
  }
}
