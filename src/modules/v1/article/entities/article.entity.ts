import { BaseSchema } from 'src/database/schemas/base.schema';
import { Column, Entity } from 'typeorm';

@Entity('article')
export class Article extends BaseSchema {
  @Column({ type: 'varchar', length: 50, unique: true })
  sku: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, name: 'unit_price' })
  unitPrice: number;

  @Column({ type: 'int', nullable: true, name: 'wholesale_quantity' })
  wholesaleQuantity: number;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
    name: 'wholesale_discount',
  })
  wholesaleDiscount: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;
}
