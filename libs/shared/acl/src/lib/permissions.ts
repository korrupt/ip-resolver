/* eslint-disable */
import { IAccessInfo } from 'nest-access-control';
import { AccessRole } from './access-role.enum';
import { AccessResource } from './access-resource.enum';
import { ResourceKeys } from './resource-keys.type'
import { DeviceModel, UserModel } from '@ip-resolver/shared/models';

export const USER_PERMISSIONS: IAccessInfo[] = [
  // User
  { role: AccessRole.USER, resource: AccessResource.USER, action: 'read:own', attributes: ['*'] satisfies ResourceKeys<UserModel> },
  { role: AccessRole.USER, resource: AccessResource.USER, action: 'update:own', attributes: ['*', '!id', '!roles'] satisfies ResourceKeys<UserModel> },
  { role: AccessRole.USER, resource: AccessResource.USER, action: 'delete:own', attributes: ['*'] },

  // Device
  { role: AccessRole.USER, resource: AccessResource.DEVICE, action: 'read:own', attributes: ['*'] },
  { role: AccessRole.USER, resource: AccessResource.DEVICE, action: 'update:own', attributes: ['description'] satisfies ResourceKeys<DeviceModel> },
  { role: AccessRole.USER, resource: AccessResource.DEVICE, action: 'create:own', attributes: ['description'] satisfies ResourceKeys<DeviceModel> },
  { role: AccessRole.USER, resource: AccessResource.DEVICE, action: 'delete:own', attributes: [] satisfies ResourceKeys<DeviceModel> },
];

export const SUPER_ADMIN_PERMISSIONS: IAccessInfo[] = Object.values(AccessResource).flatMap((resource) => [
  { role: AccessRole.SUPER_ADMIN, resource, action: 'create:own', attributes: ['*'] },
  { role: AccessRole.SUPER_ADMIN, resource, action: 'create:any', attributes: ['*'] },
  { role: AccessRole.SUPER_ADMIN, resource, action: 'read:own', attributes: ['*'] },
  { role: AccessRole.SUPER_ADMIN, resource, action: 'read:any', attributes: ['*'] },
  { role: AccessRole.SUPER_ADMIN, resource, action: 'update:own', attributes: ['*'] },
  { role: AccessRole.SUPER_ADMIN, resource, action: 'update:any', attributes: ['*'] },
  { role: AccessRole.SUPER_ADMIN, resource, action: 'delete:own', attributes: ['*'] },
  { role: AccessRole.SUPER_ADMIN, resource, action: 'delete:any', attributes: ['*'] },
]);

export const ADMIN_PERMISSIONS: IAccessInfo[] = [
  // user
  { role: AccessRole.ADMIN, resource: AccessResource.USER, action: 'create:any', attributes: ['*'] },
  { role: AccessRole.ADMIN, resource: AccessResource.USER, action: 'read:any', attributes: ['*'] },
  { role: AccessRole.ADMIN, resource: AccessResource.USER, action: 'update:any', attributes: ['*'] },
  { role: AccessRole.ADMIN, resource: AccessResource.USER, action: 'delete:any', attributes: ['*'] },

  // device
  { role: AccessRole.ADMIN, resource: AccessResource.DEVICE, action: 'create:any', attributes: ['*'] },
  { role: AccessRole.ADMIN, resource: AccessResource.DEVICE, action: 'read:any', attributes: ['*'] },
  { role: AccessRole.ADMIN, resource: AccessResource.DEVICE, action: 'update:any', attributes: ['*'] },
  { role: AccessRole.ADMIN, resource: AccessResource.DEVICE, action: 'delete:any', attributes: ['*'] },
];

