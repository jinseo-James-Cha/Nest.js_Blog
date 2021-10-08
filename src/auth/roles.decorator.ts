import { SetMetadata } from '@nestjs/common';
import { Role } from './role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
/*
(alias) SetMetadata<string, Role[]>(metadataKey: string, metadataValue: Role[]): CustomDecorator<string>
import SetMetadata
Decorator that assigns metadata to the class/function using the specified key.

Requires two parameters:

key - a value defining the key under which the metadata is stored
value - metadata to be associated with key
This metadata can be reflected using the Reflector class.

Example: @SetMetadata('roles', ['admin'])
*/
