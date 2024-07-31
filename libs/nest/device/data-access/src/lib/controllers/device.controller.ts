import { Body, Controller, Delete, Get, InternalServerErrorException, Ip, Param, Patch, Post, Put, Req } from "@nestjs/common";
import { NestDeviceService } from "../services";
import { PutDeviceDto } from "../dto";
import type { Request } from 'express';

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
  public async deleteDeviceById(@Param('id') id: string) {
    return this.device.deleteDevice(id);
  }

  @Put(':id')
  public async putDevice(@Param('id') id: string, @Body() dto: PutDeviceDto) {
    return this.device.putDevice(id, dto);
  }

  @Put(':id/ip')
  public async putDeviceIp(@Param('id') id: string, @Req() req: Request) {
    const ip = req.headers['x-forwarded-for']?.toString() || req.socket.remoteAddress;

    if (!ip) {
      throw new InternalServerErrorException(`Could not get remote IP`);
    }

    return this.device.putDeviceIp(id, ip);
  }

}
