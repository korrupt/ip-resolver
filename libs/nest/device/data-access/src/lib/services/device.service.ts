import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeviceEntity } from "../entities";
import { Repository } from "typeorm";


@Injectable()
export class NestDeviceService {
  constructor(@InjectRepository(DeviceEntity) private device: Repository<DeviceEntity>){}

  public async save(device: DeviceEntity): Promise<DeviceEntity> {
    return this.device.save(device);
  }
}
