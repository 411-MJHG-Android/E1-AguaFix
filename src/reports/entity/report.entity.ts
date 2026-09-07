import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('WATER_REPORT')
export class WaterReport{
    @PrimaryGeneratedColumn()
    id!: number

    @Column({length: 255})
    address!: string;

    @Column()
    description!: string;

    @Column()
    severity!: string;

    @Column()
    reporterPhone!: string;

    @Column({default: false})
    isResolved!: boolean;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

}