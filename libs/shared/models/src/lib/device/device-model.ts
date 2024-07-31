
export interface DeviceModel {
  slug: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
  last_ip?: string;
  last_ip_at?: Date;
}

export type CreateDeviceModel = Pick<DeviceModel, 'slug' | 'description'>;
export type UpdateDeviceModel = Partial<DeviceModel>;
