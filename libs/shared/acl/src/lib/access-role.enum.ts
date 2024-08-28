export enum AccessRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
  ANONYMOUS = "ANONYMOUS"
}


export const AccessRoleOrder: Record<AccessRole, number> = {
  SUPER_ADMIN: 0,
  ADMIN: 1,
  // adding some padding
  USER: 9,
  ANONYMOUS: 10,
};
