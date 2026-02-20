import { BaseSchema } from 'src/database/schemas/base.schema';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Facture } from './facture.entity';
import { Article } from '../../article/entities/article.entity';

@Entity('facture_detail')
export class FactureDetail extends BaseSchema {
  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, name: 'unit_price' })
  unitPrice: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  subtotal: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  discount: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  total: number;

  @ManyToOne(() => Facture, (facture) => facture.details, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'facture_id' })
  facture: Facture;

  @ManyToOne(() => Article, (article) => article)
  @JoinColumn({ name: 'article_id' })
  article: Article;
}
