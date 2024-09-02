import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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


  public async findById(id: string, throws: false): Promise<DeviceEntity | null>;
  public async findById(id: string, throws?: true): Promise<DeviceEntity>;
  public async findById(id: string, throws = true): Promise<DeviceEntity | null> {
    const found = await this.device.findOneBy({ id });

    if (!found && throws) {
      throw new NotFoundException();
    }

    return found;
  }

  public async putDevice(id: string, dto: PutDeviceDto) {
    const found = await this.device.findOneBy({ id }) ?? { id };
    return this.device.save({ ...found, ...dto });
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
