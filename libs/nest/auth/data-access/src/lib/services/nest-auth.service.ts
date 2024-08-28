import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { AuthUserEntity } from "../entities";
import { DataSource, EntityManager, Repository } from "typeorm";
import { CreateAuthLocalDto, LoginAuthLocalDto } from "../dto";
import * as bcrypt from 'bcryptjs';
import { UserEntity, UserFactory } from "@ip-resolver/nest/user/data-access";
import { AuthUserFactory } from "../factory";
import { AccessToken, CreateAuthLocalResult, JwtPayload } from "@ip-resolver/shared/models";
import { JwtService } from "@nestjs/jwt";
import { AccessRole } from "@ip-resolver/shared/acl";

@Injectable()
export class NestAuthService {
  constructor(
    @InjectRepository(AuthUserEntity) private authUser: Repository<AuthUserEntity>,
    @InjectRepository(UserEntity) private user: Repository<UserEntity>,
    @InjectDataSource() private dataSource: DataSource,
    private jwt: JwtService,
  ){}

  public async checkForSuperAdmin(): Promise<boolean> {
    const [{ exists }] = await this.dataSource.query<[{ exists: boolean }]>(`
        SELECT EXISTS (
          SELECT 1
          FROM "user" u
          WHERE 'SUPER_ADMIN' = ANY(u.roles)
        );
      `);

    return exists;
  }

  async createAuthLocalUser(dto: CreateAuthLocalDto): Promise<CreateAuthLocalResult> {
    const { email, name, password } = dto;

    // check if exists
    const found = await this.authUser.findOneBy({ email });
    if (found) {
      throw new ForbiddenException(`Email already in use`);
    }

    const super_admin = await this.checkForSuperAdmin();

    const hash = await bcrypt.hash(password, 15);

    const { id: user_id, roles: user_roles } = await this.dataSource.transaction(async (em: EntityManager) => {
      const [{ id }] = await em.query('SELECT uuid_generate_v4() as id');

      const roles = !super_admin ? [AccessRole.SUPER_ADMIN] : [];

      const user = await em.save(UserEntity, UserFactory.createUserObject({ id, name, owner_id: id, roles }), { reload: true });
      const _ = await em.save(AuthUserEntity, AuthUserFactory.createAuthUserObject({ email, hash, user, owner_id: id }));

      return user;
    });

    return {
      id: user_id,
      name,
      email,
      roles: user_roles,
    }
  }

  async loginAuthLocalUser(dto: LoginAuthLocalDto): Promise<AccessToken> {
    const { email, password, remember } = dto;
    // check if exists
    const found = await this.authUser.findOneBy({ email });
    if (!found) {
      throw new NotFoundException(`User with email '${email}' not found.`);
    }

    const user = await this.user.findOneBy({ id: found.user_id });
    if (!user) {
      throw new InternalServerErrorException(`Email exists but is not connected to a user.`); // should never happen
    }

    // check disabled
    if (found.disabled) {
      throw new ForbiddenException(`This login method has been disabled for this user.`);
    }

    if (user.disabled) {
      throw new ForbiddenException(`User has been disabled.`);
    }

    // check password
    const matches = await bcrypt.compare(password, found.hash);
    if (!matches) {
      throw new ForbiddenException(`Email/password doesnt match`);
    }

    const access_token = await this.jwt.signAsync(<JwtPayload>{ sub: user.id, email, roles: user.roles, name: user.name, });

    return { access_token };
  }
}
