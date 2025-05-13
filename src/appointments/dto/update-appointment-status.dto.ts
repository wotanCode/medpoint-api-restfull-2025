import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AppointmentStatus } from '../../interfaces';

export class UpdateAppointmentStatusDto {
  @ApiProperty({
    description: 'Nuevo estado de la cita',
    enum: AppointmentStatus,
    example: AppointmentStatus.confirmed
  })
  @IsEnum(AppointmentStatus)
  @IsNotEmpty()
  status: AppointmentStatus;

  @ApiProperty({
    description: 'Notas o comentarios sobre el cambio de estado',
    example: 'Cita confirmada para el horario solicitado',
    required: false
  })
  @IsString()
  @IsOptional()
  notes?: string;
} 