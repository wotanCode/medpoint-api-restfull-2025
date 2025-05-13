import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/users.module';
import { User } from '../auth/entities/user.entity';
import { Appointment } from '../appointments/entities/appointment.entity';
import { Payment } from 'src/payments/entities/payment.entity';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([User, Appointment, Payment])
  ]
})
export class SeedModule { }
