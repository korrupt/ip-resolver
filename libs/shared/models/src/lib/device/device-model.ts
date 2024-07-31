
export interface DeviceModel {
  id: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
  last_ip?: string;
  last_ip_at?: Date;
}

export type CreateDeviceModel = Pick<DeviceModel, 'id' | 'description'>;
export type UpdateDeviceModel = Partial<DeviceModel>;
