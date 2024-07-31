import { Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { NestDeviceService } from "../services";


@Controller('device')
export class NestDeviceController {
  constructor(private device: NestDeviceService){}

  @Get()
  public async getDevices() {
    return this.device.find();
  }

  @Get(':id')
  public async getDeviceById(@Param('id') id: string) {
    return this.device.findById(id);
  }

  @Delete(':id')
  public async deleteDeviceById() {}

  @Patch(':id')
  public async updateDeviceById() {}

  @Post()
  public async createDevice() {}

  @Put(':id/ip')
  public async putDeviceIp() {}

}
