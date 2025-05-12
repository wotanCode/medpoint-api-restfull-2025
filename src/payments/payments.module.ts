import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Payment } from './entities/payment.entity';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  imports: [TypeOrmModule.forFeature([Payment])],
})
export class PaymentsModule {}
