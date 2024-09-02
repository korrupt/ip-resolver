import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthKeyAccessEntity, AuthKeyEntity } from "../entities";
import { Repository } from "typeorm";


@Injectable()
export class NestAuthKeyService {
  constructor(
    @InjectRepository(AuthKeyEntity) private authKey: Repository<AuthKeyEntity>,
    @InjectRepository(AuthKeyAccessEntity) private authKeyAccess: Repository<AuthKeyAccessEntity>
  ){}

  public async findOne(id: string): Promise<AuthKeyEntity> {
    const found = await this.authKey.findOneBy({ id });

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

}
