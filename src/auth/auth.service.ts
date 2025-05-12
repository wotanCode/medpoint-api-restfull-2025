import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { validate as isUUID } from 'uuid';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {

  private readonly logger = new Logger('UsersService')

  // Agregar aqui nombre del patron, patron repostiorio?
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }


  // Registramos un usuario
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {

      // Encriptamos la contraseña
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);
      // delete user.password;
      return user;
    } catch (error) {
      this.handleDBExceptions(error);
      throw error;
    }
  }

  // Registramos un usuario
  async loginUser(createUserDto: CreateUserDto): Promise<User> {
    try {

      // Encriptamos la contraseña
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);
      // delete user.password;
      return user;
    } catch (error) {
      this.handleDBExceptions(error);
      throw error;
    }
  }

  // Todos los usuarios
  findAll() {
    return this.userRepository.find({});
  }

  async findOne(term: string) {
    let user: User | null;

    if (isUUID(term)) {
      user = await this.userRepository.findOneBy({ id: term });
    } else {
      user = await this.userRepository.findOneBy({ email: term });
    }

    if (!user) {
      throw new NotFoundException(`User with term '${term}' not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    })

    if (!user) {
      throw new NotFoundException('User with id: ${id} not found');
    }

    try {
      await this.userRepository.save(user)
      return user;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  // Solo para el seed
  deleteAllUsers() {
    this.userRepository.createQueryBuilder()
      .delete()
      .where({})
      .execute();
  }

  // Manejo de errores de la bd
  private handleDBExceptions(error: any) {
    console.log(error)
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check logs');
  }
}
