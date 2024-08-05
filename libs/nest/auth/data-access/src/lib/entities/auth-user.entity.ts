import { UserEntity } from "@ip-resolver/nest/user/data-access";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('auth_user')
export class AuthUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({})
  email!: string;

  @Column({ type: 'text' })
  hash!: string;

  @Column({ type: 'boolean' })
  disabled!: boolean;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user!: UserEntity;

  // @Column({})
  user_id!: string;
}
