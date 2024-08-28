import { AccessRole } from "@ip-resolver/shared/acl";
import { UserEntity } from "../entities";

export type CreateUserOptions = {
  name: string;
  roles?: string[];
  owner_id: string;
  id: string;
}

export class UserFactory {
  static createUserObject(options: CreateUserOptions): Omit<UserEntity, 'id' | 'created_at' | 'updated_at'> {
    return {
      name: options.name,
      owner_id: options.owner_id,
      roles: (options.roles || []).concat(AccessRole.USER),
      disabled: false,
    }
  }
}
