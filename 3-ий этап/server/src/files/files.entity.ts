import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('image')
export class FilesEntity {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @Column({ nullable: true })
    essenceId: number;

    @Column({ nullable: true })
    essenceTable: string;

    @Column({ type: 'bigint' })
    createdData: number;
}
