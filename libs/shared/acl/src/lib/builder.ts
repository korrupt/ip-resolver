import { RolesBuilder } from "nest-access-control";
import { ADMIN_PERMISSIONS, SUPER_ADMIN_PERMISSIONS, USER_PERMISSIONS } from "./permissions";
import { AccessRole } from "./access-role.enum";

const builder = new RolesBuilder([
  ...SUPER_ADMIN_PERMISSIONS,
  ...USER_PERMISSIONS,
  ...ADMIN_PERMISSIONS
]);

// define all roles
builder.grant(Object.values(AccessRole));


export { builder };
