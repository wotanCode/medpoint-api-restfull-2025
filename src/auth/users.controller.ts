import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { Auth, GetUser } from './decorators';

import { ValidRoles } from 'src/interfaces';

@ApiTags('Usuarios')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: AuthService) { }

  /**
   * Registra un nuevo usuario en el sistema
   * Este punto final es público y no requiere autenticación
   */
  @Post('auth/register')
  @ApiOperation({ 
    summary: 'Registrar nuevo usuario',
    description: 'Crea una nueva cuenta de usuario con la información proporcionada. El usuario será asignado como paciente por defecto.'
  })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado exitosamente',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos o error de validación',
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor',
  })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  /**
   * Autentica un usuario y obtiene el token JWT
   * Este punto final es público y no requiere autenticación
   */
  @Post('auth/login')
  @ApiOperation({ 
    summary: 'Iniciar sesión',
    description: 'Autentica un usuario y devuelve un token JWT para las siguientes peticiones'
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario autenticado exitosamente',
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales inválidas',
  })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.loginUser(loginUserDto);
  }

  /**
   * Verifica el estado de autenticación del usuario actual
   * Requiere un token JWT válido
   */
  @Get('check-status')
  @Auth()
  @ApiOperation({ 
    summary: 'Verificar estado de autenticación',
    description: 'Verifica si la sesión del usuario actual es válida y devuelve la información del usuario'
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario autenticado',
    type: User,
  })
  @ApiResponse({
    status: 401,
    description: 'Token inválido o expirado',
  })
  checkAuthStatus(@GetUser() user: User) {
    return this.usersService.checkAuthStatus(user);
  }

  /**
   * Obtiene todos los usuarios del sistema
   * Solo accesible por doctores y admins
   */
  @Get()
  @Auth(ValidRoles.doctor, ValidRoles.admin)
  @ApiOperation({ 
    summary: 'Obtener todos los usuarios',
    description: 'Obtiene una lista de todos los usuarios en el sistema. Solo accesible por doctores y administradores.'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios obtenida exitosamente',
    type: [User],
  })
  @ApiResponse({
    status: 403,
    description: 'Permisos insuficientes para acceder a este recurso',
  })
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * Obtiene un usuario específico por ID o email
   * Solo accesible por doctores y admins
   */
  @Get(':term')
  @Auth(ValidRoles.doctor, ValidRoles.admin)
  @ApiOperation({ 
    summary: 'Obtener usuario por ID o email',
    description: 'Obtiene un usuario específico por su ID o dirección de correo electrónico'
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado exitosamente',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
  })
  findOne(@Param('term') term: string) {
    return this.usersService.findOne(term);
  }

  /**
   * Actualiza la información de un usuario
   * Solo accesible por doctores y admins
   */
  @Patch(':id')
  @Auth(ValidRoles.doctor, ValidRoles.admin)
  @ApiOperation({ 
    summary: 'Actualizar información de usuario',
    description: 'Actualiza la información de un usuario específico. Solo accesible por doctores y administradores.'
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado exitosamente',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de actualización inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * Elimina un usuario del sistema
   * Solo accesible por admins
   */
  @Auth(ValidRoles.admin)
  @Delete(':id')
  @ApiOperation({ 
    summary: 'Eliminar usuario',
    description: 'Elimina permanentemente un usuario del sistema. Esta acción no se puede deshacer.'
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
  })
  @ApiResponse({
    status: 403,
    description: 'Permisos insuficientes para eliminar usuarios',
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
