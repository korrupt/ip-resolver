import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";


@Entity('auth_key', { synchronize: false })
export class AuthKeyEntity {
  @PrimaryColumn()
  id!: string;

  @Column({})
  permissions!: string;

  @Column({ nullable: true })
  description!: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updated_at!: Date;
}
