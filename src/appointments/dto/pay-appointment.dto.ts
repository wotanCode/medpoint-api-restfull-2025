import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PayAppointmentDto {
  @ApiProperty({
    description: 'ID de la cita a pagar',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  @IsNotEmpty()
  appointmentId: string;

  @ApiProperty({
    description: 'Método de pago (ej: tarjeta, transferencia)',
    example: 'card'
  })
  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @ApiProperty({
    description: 'Token de pago (proporcionado por la pasarela de pagos)',
    example: 'tok_visa'
  })
  @IsString()
  @IsNotEmpty()
  paymentToken: string;
} 