import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { Auth, GetUser } from './decorators';
import { ValidRoles } from 'src/interfaces';
import { User } from './entities/user.entity';

// TODO: Cambiar a users/auth
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: AuthService) { }

  // Registramos un usuario nuevo, no requiere autenticación
  @Post('auth/register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  // Login del usuario, no requiere autenticación.
  @Post('auth/login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.loginUser(loginUserDto);
  }

  // Verificamos credenciales del usuario, util para el frontend
  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.usersService.checkAuthStatus(user);
  }

  // Solo el doctor y admin pueden ver la lista.
  @Get()
  @Auth(ValidRoles.doctor, ValidRoles.admin)
  findAll() {
    return this.usersService.findAll();
  }

  // Obtenemos un usuario en base al id o email
  @Get(':term')
  @Auth(ValidRoles.doctor, ValidRoles.admin)
  findOne(@Param('term') term: string) {
    return this.usersService.findOne(term);
  }

  // Solo el doctor y admin pueden actualizar un usuario.
  @Patch(':id')
  @Auth(ValidRoles.doctor, ValidRoles.admin)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  // Solo el admin puede eliminar un usuario.
  @Auth(ValidRoles.admin)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
