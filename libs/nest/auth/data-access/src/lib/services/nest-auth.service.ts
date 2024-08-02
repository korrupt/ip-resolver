import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthKeyEntity } from "../entities";
import { Repository } from "typeorm";

@Injectable()
export class NestAuthService {
  constructor(@InjectRepository(AuthKeyEntity) private authKey: Repository<AuthKeyEntity>){}
}
