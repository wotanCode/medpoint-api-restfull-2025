import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { Auth, GetUser } from './decorators';

import { ValidRoles } from 'src/interfaces';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: AuthService) { }

  // Registramos un usuario nuevo, no requiere autenticación
  @Post('auth/register')
  @ApiResponse({
    status: 201,
    description: 'User registered successfully.',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, invalid input or validation error.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error, unexpected error.',
  })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  // Login del usuario, no requiere autenticación.
  @Post('auth/login')
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, invalid credentials.',
  })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.loginUser(loginUserDto);
  }

  // Verificamos credenciales del usuario, útil para el frontend.
  @Get('check-status')
  @Auth()
  @ApiResponse({
    status: 200,
    description: 'Authenticated user status returned.',
    type: User,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, invalid token or session expired.',
  })
  checkAuthStatus(@GetUser() user: User) {
    return this.usersService.checkAuthStatus(user);
  }

  // Solo el doctor y admin pueden ver la lista.
  @Get()
  @Auth(ValidRoles.doctor, ValidRoles.admin)
  @ApiResponse({
    status: 200,
    description: 'List of all users.',
    type: [User],
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden, the user does not have access rights.',
  })
  findAll() {
    return this.usersService.findAll();
  }

  // Obtenemos un usuario en base al id o email
  @Get(':term')
  @Auth(ValidRoles.doctor, ValidRoles.admin)
  @ApiResponse({
    status: 200,
    description: 'User details fetched successfully.',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  findOne(@Param('term') term: string) {
    return this.usersService.findOne(term);
  }

  // Solo el doctor y admin pueden actualizar un usuario.
  @Patch(':id')
  @Auth(ValidRoles.doctor, ValidRoles.admin)
  @ApiResponse({
    status: 200,
    description: 'User updated successfully.',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, invalid data or update failed.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found to update.',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  // Solo el admin puede eliminar un usuario.
  @Auth(ValidRoles.admin)
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found for deletion.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden, the user does not have permission to delete.',
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
