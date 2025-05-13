import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiResponse } from '@nestjs/swagger';
// import { Auth } from 'src/auth/decorators';
// import { ValidRoles } from 'src/interfaces';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) { }

  // Solo un admin puede ejecutar el seed, pero dejé
  // la línea comentada para que cualquiera pueda probar
  // con mayor comodidad.
  @Get()
  // @Auth(ValidRoles.admin)
  @ApiResponse({
    status: 200,
    description: 'Seed executed successfully. Database has been seeded.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error, failed to run seed.',
  })
  executeSeed() {
    return this.seedService.runSeed();
  }
}
