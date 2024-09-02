import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { AuthKeyEntity } from "./auth-key.entity";


@Entity('auth_key_access', { synchronize: false })
export class AuthKeyAccessEntity {
  @PrimaryColumn({ type: 'timestamptz' })
  time!: Date;

  @Column()
  method!: string;

  @Column()
  path!: string;

  @Column()
  ip!: string;

  @ManyToOne(() => AuthKeyEntity)
  @JoinColumn({ name: 'auth_key_id', referencedColumnName: 'id' })
  auth_key_id!: string;
}
