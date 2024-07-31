import { Controller, Delete, Get, Patch, Post, Put } from "@nestjs/common";


@Controller('device')
export class NestDeviceController {
  @Get()
  public async getDevices() {}

  @Get(':id')
  public async getDeviceById() {}

  @Delete(':id')
  public async deleteDeviceById() {}

  @Patch(':id')
  public async updateDeviceById() {}

  @Post()
  public async createDevice() {}

  @Put(':id/ip')
  public async putDeviceIp() {}

}
