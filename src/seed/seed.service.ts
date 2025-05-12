import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

import { initialData } from './data/seed-data';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class SeedService {

  constructor(
    private readonly usersService: AuthService
  ) { }

  async runSeed() {

    await this.insertSeedtUsers();

    return 'seed executed';
  }

  private async insertSeedtUsers() {
    // Borramos todos los usuarios anteriores
    await this.usersService.deleteAllUsers();

    const users = initialData.users;

    const insertPromises: Promise<User>[] = [];

    users.forEach(user => {
      insertPromises.push(this.usersService.create(user));
    });

    await Promise.all(insertPromises);

    return true;
  }

}
