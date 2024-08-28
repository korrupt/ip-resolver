import { AccessRole } from "./access-role.enum";

export interface JwtPayload {
  sub: string;
  name: string;
  email: string;
  roles: AccessRole[];
  exp: number;
}
