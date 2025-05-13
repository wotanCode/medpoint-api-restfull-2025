import { IsNotEmpty, IsUUID, IsDateString, IsString, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({
    description: 'ID del doctor que atenderá la cita',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsNotEmpty()
  @IsUUID()
  doctorId: string;

  @ApiProperty({
    description: 'Fecha y hora de la cita',
    example: '2024-03-20T10:00:00Z'
  })
  @IsNotEmpty()
  @IsDateString()
  appointmentTime: string;

  @ApiProperty({
    description: 'Razón o motivo de la cita',
    example: 'Consulta de rutina',
    required: false
  })
  @IsOptional()
  @IsString()
  @MinLength(10)
  reason?: string;
}
