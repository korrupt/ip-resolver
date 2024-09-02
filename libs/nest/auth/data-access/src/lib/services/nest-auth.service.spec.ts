jest.mock('bcryptjs');

import { Test } from "@nestjs/testing";
import { NestAuthService } from "./nest-auth.service";
import { DataSource, Repository } from "typeorm";
import { getDataSourceToken, getRepositoryToken } from "@nestjs/typeorm";
import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";
import { AuthUserEntity } from "../entities";
import { UserEntity } from "@ip-resolver/nest/user/data-access";
import { JwtService } from "@nestjs/jwt";
import { CreateAuthLocalDto, LoginAuthLocalDto } from "../dto";
import { ForbiddenException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { compare, hash } from "bcryptjs";
jest.mock('bcryptjs');

class DatasourceMock {
  transaction = jest.fn();
  query = jest.fn();
}

class RepositoryMock {
  static mock(...entities: EntityClassOrSchema[]) {
    const instance = new RepositoryMock();

    return entities.map((e) => (
      {
        provide: getRepositoryToken(e),
        useValue: instance
      }
    ));
  }

  save = jest.fn();
  findOneBy = jest.fn();
}


describe('NestAuthService', () => {
  let service: NestAuthService;
  let authUserRepoMock: jest.Mocked<Repository<AuthUserEntity>>;
  let userRepoMock: jest.Mocked<Repository<UserEntity>>;
  let mockedDatasource: jest.Mocked<DataSource>;
  let mockedJwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        NestAuthService,
        ...RepositoryMock.mock(AuthUserEntity, UserEntity),
        {
          provide: getDataSourceToken(),
          useValue: new DatasourceMock()
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          }
        }
      ],
    }).compile();


    service = module.get(NestAuthService);
    authUserRepoMock = module.get(getRepositoryToken(AuthUserEntity));
    userRepoMock = module.get(getRepositoryToken(UserEntity));
    mockedDatasource = module.get(getDataSourceToken());
    mockedJwtService = module.get(JwtService);
  });

  it('should exist', () => {
    expect(service).toBeDefined();
  });

  describe('createAuthLocalUser', () => {
    const authUser = { email: 'foo@bar.com' };
    const dto: CreateAuthLocalDto = {
      email: 'foo@bar.com',
      name: 'Foo Bar',
      password: '123',
    };

    it('should throw if exists', async () => {
      authUserRepoMock.findOneBy.mockResolvedValueOnce(authUser as AuthUserEntity);

      const call = () => service.createAuthLocalUser(dto);
      expect(call()).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('should run in transaction', async () => {
      authUserRepoMock.findOneBy.mockResolvedValueOnce(null);
      jest.mocked(hash).mockImplementationOnce((e) => e);

      const mockEm = {
        save: jest.fn((e) => ({ ...e, id: '123', roles: [] })),
        query: jest.fn(() => Promise.resolve([{ id: '123' }])),
      };


      jest.spyOn(service, 'checkForSuperAdmin').mockResolvedValueOnce({ exists: false }); // fix
      // @ts-ignore
      mockedDatasource.transaction.mockImplementationOnce((cb: () => any) => cb.call(null, mockEm));

      const call = () => service.createAuthLocalUser(dto);
      await expect(call()).resolves.toEqual(expect.objectContaining({ email: dto.email }));
      expect(mockEm.save).toHaveBeenCalledTimes(2);
    });
  });

  describe('loginAuthLocalUser()', () => {
    const dto: LoginAuthLocalDto = {
      email: 'test@testesen.no',
      password: '123',
    };

    const authUser = { email: 'test@testesen.no' };

    it('should throw if not exists', async () => {
      authUserRepoMock.findOneBy.mockResolvedValueOnce(null);

      const call = () => service.loginAuthLocalUser(dto);
      expect(call()).rejects.toBeInstanceOf(NotFoundException);
    });

    it('should throw internal if theres no user', async () => {
      authUserRepoMock.findOneBy.mockResolvedValueOnce(authUser as AuthUserEntity);

      const call = () => service.loginAuthLocalUser(dto);
      expect(call()).rejects.toBeInstanceOf(InternalServerErrorException);
    });

    it('should throw forbidden if email login method is disabled', async () => {
      userRepoMock.findOneBy.mockResolvedValueOnce({ disabled: true } as UserEntity);
      authUserRepoMock.findOneBy.mockResolvedValueOnce({ ...authUser, user: {}, disabled: false } as AuthUserEntity);

      try {
        await service.loginAuthLocalUser(dto);
      } catch (err) {
        expect(err).toBeInstanceOf(ForbiddenException);
        expect((<ForbiddenException>err).message).toEqual("This login method has been disabled for this user.");
      }
    });

    it('should throw forbidden if email login method is disabled', async () => {
      userRepoMock.findOneBy.mockResolvedValueOnce({ disabled: false } as UserEntity);
      authUserRepoMock.findOneBy.mockResolvedValueOnce({ ...authUser, user: {}, disabled: true } as AuthUserEntity);

      try {
        await service.loginAuthLocalUser(dto);
      } catch (err) {
        expect(err).toBeInstanceOf(ForbiddenException);
        expect((<ForbiddenException>err).message).toEqual("User has been disabled.");
      }
    });

    it('should throw if password is wrong', async () => {
      userRepoMock.findOneBy.mockResolvedValueOnce({ disabled: false } as UserEntity);
      authUserRepoMock.findOneBy.mockResolvedValueOnce({ ...authUser, user: {}, disabled: false } as AuthUserEntity);

      jest.mocked(compare).mockImplementationOnce(() => Promise.resolve(false));


      try {
        await service.loginAuthLocalUser(dto);
      } catch (err) {
        expect(err).toBeInstanceOf(ForbiddenException);
        expect((<ForbiddenException>err).message).toEqual("Email/password doesnt match");
      }
    });

    it('return an access token', async () => {
      userRepoMock.findOneBy.mockResolvedValueOnce({ disabled: false } as UserEntity);
      authUserRepoMock.findOneBy.mockResolvedValueOnce({ ...authUser, user: {}, disabled: false } as AuthUserEntity);

      jest.mocked(compare).mockImplementationOnce(() => Promise.resolve(true));

      const access_token = 'access_token123ayy';
      mockedJwtService.signAsync.mockImplementationOnce(() => Promise.resolve(access_token));

      const call = () => service.loginAuthLocalUser(dto);
      expect(call()).resolves.toEqual({ access_token });
    });

  });

});
