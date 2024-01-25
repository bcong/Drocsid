import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account')
export class Account {
    @PrimaryColumn({ type: "bigint" })
    id: number;

    @Column({ length: 128, nullable: false, unique: true })
    email: string

    @Column({ length: 24, nullable: false })
    name: string

    @Column({ length: 128, nullable: false })
    password: string

    @Column({ length: 128, nullable: true, unique: true })
    refresh_token: string

    @CreateDateColumn({ nullable: false })
    created_at: Date

    @UpdateDateColumn({ nullable: true })
    update_at: Date
}
