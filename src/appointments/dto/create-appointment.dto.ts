import { IsDateString, IsNotEmpty, IsString, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({
    description: 'ID del doctor que atenderá la cita',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  @IsNotEmpty()
  doctorId: string;

  @ApiProperty({
    description: 'Fecha y hora de la cita (formato ISO)',
    example: '2024-03-20T10:00:00Z'
  })
  @IsDateString()
  @IsNotEmpty()
  appointmentTime: string;

  @ApiProperty({
    description: 'Razón o motivo de la cita',
    example: 'Consulta de rutina'
  })
  @IsString()
  @IsOptional()
  reason?: string;

  @ApiProperty({
    description: 'Monto de la cita',
    example: 50.00
  })
  @IsOptional()
  amount?: number;
}
