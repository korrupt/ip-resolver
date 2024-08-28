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
      roles: [AccessRole.USER],
      disabled: false,
      ...options,
    }
  }
}
