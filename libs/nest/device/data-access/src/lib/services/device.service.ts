import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeviceEntity } from "../entities";
import { Repository } from "typeorm";
import { PutDeviceDto } from "../dto";


@Injectable()
export class NestDeviceService {
  constructor(@InjectRepository(DeviceEntity) private device: Repository<DeviceEntity>){}

  public async find(): Promise<DeviceEntity[]> {
    return this.device.find();
  }

  public async findById(id: string): Promise<DeviceEntity> {
    const device = await this.device.findOneBy({ id });

    if (!device) {
      throw new NotFoundException();
    }

    return device;
  }

  public async putDevice(id: string, dto: PutDeviceDto) {
    const found = await this.device.findOneBy({ id }) ?? {};
    return this.device.save({ id, ...found, ...dto });
  }


  public async putDeviceIp(id: string, ip: string): Promise<void> {
    const device = await this.findById(id);
    await this.device.save({ ...device, last_ip: ip, last_ip_at: new Date() });
  }

  public async deleteDevice(id: string) {
    const device = await this.findById(id);
    await this.device.remove(device);

    return { id };
  }
}
