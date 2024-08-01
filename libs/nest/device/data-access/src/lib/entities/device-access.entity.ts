import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { DeviceEntity } from "./device.entity";


@Entity('device_heartbeat', { synchronize: false })
export class DeviceHeartbeatEntity {
  @PrimaryColumn({ type: 'timestamp with time zone' })
  time!: Date;

  @Column()
  ip!: string;

  @ManyToOne(() => DeviceEntity)
  @JoinColumn({ name: 'device_id', referencedColumnName: 'id' })
  @PrimaryColumn()
  device_id!: string;
}
