import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";


@Entity('device')
export class DeviceEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  description?: string;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updated_at!: Date;

  @Column({ nullable: true })
  last_ip?: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  last_ip_at?: Date;
}
