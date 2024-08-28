import { AccessRole } from "@ip-resolver/shared/acl";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({})
  name!: string;

  @Column({ array: true, type: 'enum', enum: AccessRole, enumName: 'AccessRole' })
  roles!: string[];

  @Column({})
  disabled!: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updated_at!: Date;


  @Column({ name: 'owner_id' })
  owner_id!: string;
}
