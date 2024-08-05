import { UserEntity } from "../entities";

export type CreateUserOptions = {
  name: string;
  roles?: string[];
}

export class UserFactory {
  static createUserObject(options: CreateUserOptions): Omit<UserEntity, 'id' | 'created_at' | 'updated_at'> {
    return {
      roles: [],
      disabled: false,
      ...options,
    }
  }
}
