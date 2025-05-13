import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { Appointment } from '../appointments/entities/appointment.entity';
import { Payment } from '../payments/entities/payment.entity';

import { AuthService } from '../auth/auth.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(
    private readonly usersService: AuthService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async runSeed() {
    await this.deleteTables();
    await this.insertSeedtUsers();

    // Crea solamente usuarios de prueba, pero no crea citas ni pagos
    return 'SEED EXECUTED';
  }

  // Mantener integridad referencial: primero borrar pagos, luego citas, luego usuarios
  private async deleteTables() {
    // Eliminar todos los pagos existentes
    await this.paymentRepository.createQueryBuilder()
      .delete()
      .where({})
      .execute();

    // Eliminar todas las citas existentes
    await this.appointmentRepository.createQueryBuilder()
      .delete()
      .where({})
      .execute();

    // Eliminar todos los usuarios
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
