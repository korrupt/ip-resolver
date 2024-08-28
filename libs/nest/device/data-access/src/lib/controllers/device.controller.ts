import { Body, Controller, Delete, ForbiddenException, Get, InternalServerErrorException, Ip, Param, Patch, Post, Put, Req, UseGuards } from "@nestjs/common";
import { NestDeviceService } from "../services";
import { PutDeviceDto } from "../dto";
import type { Request } from 'express';
import { GetAuth, AuthUser, AclGuard } from "@ip-resolver/nest/auth/data-access";
import { AccessResource } from "@ip-resolver/shared/acl";

@Controller('device')
export class NestDeviceController {
  constructor(private device: NestDeviceService){}

  @Get()
  @UseGuards(AclGuard)
  public async getDevices(
    @GetAuth() auth: AuthUser,
  ) {
    const permission = auth.read(null, AccessResource.DEVICE);
    if (!permission.granted) throw new ForbiddenException();

    const result = await this.device.find();

    return permission.filter(result);
  }

  @Get(':id')
  @UseGuards(AclGuard)
  public async getDeviceById(
    @GetAuth() auth: AuthUser,
    @Param('id') id: string
  ) {
    const found = await this.device.findById(id, false);
    const permission = auth.read(found, AccessResource.DEVICE);

    if (!permission.granted) throw new ForbiddenException();

    return permission.filter(found);
  }

  @Delete(':id')
  @UseGuards(AclGuard)
  public async deleteDeviceById(
    @GetAuth() auth: AuthUser,
    @Param('id') id: string
  ) {
    const found = await this.device.findById(id, false);

    const permission = auth.delete(found, AccessResource.DEVICE);
    if (!permission.granted) throw new ForbiddenException();


    return permission.filter(found);
  }

  @Put(':id')
  @UseGuards(AclGuard)
  public async putDevice(
    @GetAuth() auth: AuthUser,
    @Param('id') id: string,
    @Body() dto: PutDeviceDto
  ) {
    const found = await this.device.findById(id, false);

    if (found) {
      const permission = auth.update(found, AccessResource.DEVICE);
      if (!permission.granted) throw new ForbiddenException();


      const filtered_permissions = permission.filter(dto);
      const result = await this.device.putDevice(id, filtered_permissions);

      const read_permissions = auth.read(result, AccessResource.DEVICE);

      return read_permissions.filter(result);
    }


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
