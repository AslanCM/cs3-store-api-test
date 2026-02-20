import { Column, Entity } from 'typeorm';
import { BaseSchema } from '../../../../database/schemas/base.schema';

@Entity('organization')
export class Organization extends BaseSchema {
  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  phone: string;

  @Column({ type: 'varchar', length: 40 })
  documentNumber: string;

  @Column({ type: 'varchar', length: 400 })
  address: string;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;
}
