import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeviceEntity } from "../entities";
import { Repository } from "typeorm";
import { UpdateDeviceDto } from "../dto";


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

  public async updateDevice(id: string, dto: UpdateDeviceDto): Promise<DeviceEntity> {
    const device = await this.findById(id);

    return this.device.save({ ...device, ...dto });
  }

  public async save(device: DeviceEntity): Promise<DeviceEntity> {
    return this.device.save(device);
  }

  public async putDeviceIp(id: string, ip: string): Promise<void> {
    const device = await this.findById(id);

    device.last_ip = ip;
    device.last_ip_at = new Date();

    await this.device.save(device);
  }
}
