import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('text-block')
export class TextBlockEntity {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @Column({ unique: true })
    slug: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column({ nullable: true })
    group: string;
}
