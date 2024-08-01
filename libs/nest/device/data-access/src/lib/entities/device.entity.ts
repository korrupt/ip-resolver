import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";


@Entity('device', { synchronize: false })
export class DeviceEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ nullable: true })
  description?: string;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updated_at!: Date;

  @Column({ name: 'last_ip' })
  last_ip!: string;
}
