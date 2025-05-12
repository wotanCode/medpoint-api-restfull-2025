import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

@Module({
  controllers: [UsersController],
  providers: [AuthService],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [AuthService, TypeOrmModule],
})
export class AuthModule {}
