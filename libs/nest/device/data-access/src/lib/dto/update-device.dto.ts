import { UpdateDeviceModel } from "@ip-resolver/shared/models";

export class UpdateDeviceDto implements UpdateDeviceModel {
  id?: string;
  description?: string;
}
