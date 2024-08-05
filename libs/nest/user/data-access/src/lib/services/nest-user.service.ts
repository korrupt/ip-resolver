import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities";
import { Repository } from "typeorm";

@Injectable()
export class NestUserService {
  constructor(
    @InjectRepository(UserEntity) private user: Repository<UserEntity>
  ){}
}
