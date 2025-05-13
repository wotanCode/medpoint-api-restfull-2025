import { Controller, Post, Body, Get, Param, UseGuards, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { PayAppointmentDto } from '../appointments/dto/pay-appointment.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';
import { ValidRoles } from '../interfaces';

@ApiTags('Payments')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('process')
  @ApiOperation({ summary: 'Process payment for an appointment' })
  @ApiResponse({ status: 200, description: 'Payment processed successfully' })
  @ApiResponse({ status: 400, description: 'Invalid payment data or payment failed' })
  @ApiResponse({ status: 404, description: 'Appointment not found' })
  async processPayment(
    @Body() payAppointmentDto: PayAppointmentDto,
    @GetUser() user: User
  ) {
    // Verificar que el usuario es un paciente
    if (!user.role.includes(ValidRoles.patient)) {
      throw new BadRequestException('Only patients can process payments');
    }
    return this.paymentsService.processPayment(
      payAppointmentDto.appointmentId,
      payAppointmentDto.paymentMethod,
      payAppointmentDto.paymentToken,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get payment details' })
  @ApiResponse({ status: 200, description: 'Payment details retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  async getPaymentDetails(
    @Param('id') id: string,
    @GetUser() user: User
  ) {
    // Verificar que el usuario es admin o doctor
    if (!user.role.includes(ValidRoles.admin) && !user.role.includes(ValidRoles.doctor)) {
      throw new BadRequestException('Only admins and doctors can view payment details');
    }
    return this.paymentsService.getPaymentDetails(id);
  }
}
