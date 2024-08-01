import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DeviceEntity, DeviceHeartbeatEntity } from "../entities";
import { Repository } from "typeorm";
import { PutDeviceDto } from "../dto";


@Injectable()
export class NestDeviceService {
  constructor(
    @InjectRepository(DeviceEntity) private device: Repository<DeviceEntity>,
    @InjectRepository(DeviceHeartbeatEntity) private device_heartbeat: Repository<DeviceHeartbeatEntity>
  ){}

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


  public async putDeviceIp(id: string, ip: string): Promise<{ ip: string }> {
    const { id: device_id } = await this.findById(id);
    await this.device_heartbeat.save({ device_id, ip });
    return { ip };
  }

  public async deleteDevice(id: string) {
    const device = await this.findById(id);
    await this.device.remove(device);

    return { id };
  }
}
