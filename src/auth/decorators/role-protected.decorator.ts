import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from 'src/interfaces';

export const META_ROLES = 'roles';

// Decorador para proteger rutas basadas en roles de usuario
export const RoleProtected = (...args: ValidRoles[]) => {
  return SetMetadata(META_ROLES, args);
};
