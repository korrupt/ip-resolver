

import _axios from "../support/axios";
import credentials from "./credentials";
import { HttpStatusCode } from "axios";
import { DeviceEntity } from "@ip-resolver/nest/device/data-access";

describe('device', () => {

  const device_id = 'test-device';
  let latest_ip: string;

  it('should add an new device', async () => {
    const res = await _axios.put(`/api/device/${device_id}`, {}, credentials.headers);
    expect(res.status).toBe(HttpStatusCode.Ok);
  });

  it('should create an IP record', async () => {
    const res = await _axios.put<{ ip: string }>(`/api/device/${device_id}/ip`, {}, credentials.headers);
    expect(res.status).toBe(HttpStatusCode.Ok);
    expect(res.data.ip).toBeDefined();
    latest_ip = res.data.ip;
  });

  it('should show the device in a list', async () => {
    const res = await _axios.get<DeviceEntity[]>(`/api/device`, credentials.headers);
    expect(res.status).toBe(HttpStatusCode.Ok);

    expect(res.data).toEqual(expect.arrayContaining([]));
  });

  it('should show the device', async () => {
    const res = await _axios.get<DeviceEntity>(`/api/device/${device_id}`, credentials.headers);
    expect(res.status).toBe(HttpStatusCode.Ok);
    expect(res.data).toEqual(expect.objectContaining({ last_ip: latest_ip, id: device_id }));
  });

  it('should delete the device', async () => {
    const res = await _axios.delete<{ id: string }>(`/api/device/${device_id}`, credentials.headers);
    expect(res.status).toBe(HttpStatusCode.Ok);

    expect(res.data.id).toBeDefined();
    expect(res.data.id).toBe(device_id);


    const deleted = () => _axios.get(`/api/device/${device_id}`, credentials.headers);
    await expect(deleted()).rejects.toEqual(
      expect.objectContaining({
        response: expect.objectContaining({
          status: HttpStatusCode.NotFound,
        }),
      })
    );
  });

});
