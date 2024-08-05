import { UserEntity } from "@ip-resolver/nest/user/data-access";
import { AuthUserEntity } from "../entities";

export type CreateAuthUserOptions = {
  email: string;
  hash: string;
  user: UserEntity;
  disabled?: boolean;
}

export class AuthUserFactory {
  static createAuthUserObject(options: CreateAuthUserOptions): Omit<AuthUserEntity, 'id' | 'user_id'> {
    return {
      disabled: false,
      ...options,
    }
  }
}
