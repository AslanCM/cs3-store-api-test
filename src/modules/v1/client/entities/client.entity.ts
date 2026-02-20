import { EDocumentType } from 'src/common/enums/document-type.enum';
import { BaseSchema } from 'src/database/schemas/base.schema';
import { Column, Entity } from 'typeorm';

@Entity('client')
export class Client extends BaseSchema {
  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 14, enum: EDocumentType, name: 'document_type' })
  documentType: EDocumentType;

  @Column({ type: 'varchar', length: 40, name: 'document_number' })
  documentNumber: string;

  @Column({ type: 'varchar', length: 400 })
  address: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;
}
