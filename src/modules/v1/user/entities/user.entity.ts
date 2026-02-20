import { Exclude } from 'class-transformer';
import { ERole } from 'src/common/enums/role.enum';
import { BaseSchema } from 'src/database/schemas/base.schema';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class User extends BaseSchema {
  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 100, name: 'first_name' })
  firstName: string;

  @Column({ type: 'varchar', length: 100, name: 'last_name' })
  lastName: string;

  @Column({ type: 'varchar', length: 20 })
  role: ERole;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;
}
