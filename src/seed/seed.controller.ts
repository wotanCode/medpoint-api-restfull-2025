import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
// import { Auth } from 'src/auth/decorators';
// import { ValidRoles } from 'src/interfaces';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) { }

  // Solo un admin puede ejecutar el seed, pero deje
  // la linea comentada para que cualquiera pueda probar
  // con mayor comodidad.
  @Get()
  // @Auth(ValidRoles.admin)
  executeSeed() {
    return this.seedService.runSeed();
  }
}
