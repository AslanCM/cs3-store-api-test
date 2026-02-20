import { EFactureStatus } from "src/common/enums/facture-status.enum";
import { BaseSchema } from "src/database/schemas/base.schema";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Client } from "../../client/entities/client.entity";
import { Organization } from "../../organization/entities/organization.entity";
import { FactureDetail } from "./facture-detail.entity";

@Entity('facture')
export class Facture extends BaseSchema {
  @Column({ type: 'varchar', length: 50, unique: true })
  invoiceNumber: string;

  @Column({ type: 'timestamp' })
  date: Date

  @Column({ type: 'timestamp' })
  expiredDate: Date

  @Column({ type: 'varchar', length: 30 })
  status: EFactureStatus;

  @Column({ type: 'decimal', precision: 12, scale: 2, name: 'total_amount' })
  totalAmount: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  discount: number;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne(() => Organization)
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;

  @OneToMany(() => FactureDetail, (detail) => detail.facture, { cascade: true })
  details: FactureDetail[];
}
