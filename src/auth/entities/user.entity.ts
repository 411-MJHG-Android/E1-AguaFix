import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('SYSTEM_USER')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({length: 150, unique: true})
    email!: string;

    @Column()
    password!: string;

    @Column('boolean', {default: true})
    isNotificationEnabled: boolean;
}