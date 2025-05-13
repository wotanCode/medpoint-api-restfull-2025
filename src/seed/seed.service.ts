import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { AuthService } from '../auth/auth.service';
import { User } from '../auth/entities/user.entity';

import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {

  constructor(
    private readonly usersService: AuthService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async runSeed() {
    await this.deleteTables();
    await this.insertSeedtUsers();

    return 'SEED EXECUTED';
  }

  //mantener integridad referencia, primero borrar pagos luego citas, luegp pacientes
  private async deleteTables() {
    await this.usersService.deleteAllUsers();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async insertSeedtUsers() {
    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.forEach((user) => {
      users.push(this.userRepository.create(user));
    });

    const dbUsers = await this.userRepository.save(seedUsers);

    return dbUsers[0];
  }

}
