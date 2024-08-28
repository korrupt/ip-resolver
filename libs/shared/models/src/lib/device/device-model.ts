
export interface DeviceModel {
  id: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
  owner_id: string;
  last_ip?: string;
  last_ip_at?: Date;
}

export type CreateDeviceModel = Pick<DeviceModel, 'id' | 'description'>;
export type UpdateDeviceModel = Partial<CreateDeviceModel>;
export type PutDeviceIp = Pick<DeviceModel, 'last_ip'>;
