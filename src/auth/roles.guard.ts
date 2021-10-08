import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    console.log('requiredRoles', requiredRoles);
    console.log('user', user);
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
/* Reflector is a Helper class providing Nest reflection capabilities.*/

/*
(method) Reflector.getAllAndOverride<Role[], any>(metadataKey: any, targets: (Function | Type<any>)[]): Role[]
Retrieve metadata for a specified key for a specified set of targets and return a first not undefined value.

@param metadataKey — lookup key for metadata to retrieve

@param targets — context (decorated objects) to retrieve metadata from
*/
