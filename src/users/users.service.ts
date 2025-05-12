import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { validate as isUUID } from 'uuid';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  private readonly logger = new Logger('UsersService')

  // Agregar aqui nombre del patron, patron repostiorio?
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }


async create(createUserDto: CreateUserDto): Promise<User> {
  try {
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
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
      user = await this.userRepository.findOneBy({ username: term });
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
