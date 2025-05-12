import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [UsersModule]
})
export class SeedModule {}
