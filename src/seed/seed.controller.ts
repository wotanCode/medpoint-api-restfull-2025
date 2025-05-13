import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/interfaces';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) { }

  // Solo un admin puede ejecutar el seed
  @Get()
  // @Auth(ValidRoles.admin)
  executeSeed() {
    return this.seedService.runSeed();
  }
}
