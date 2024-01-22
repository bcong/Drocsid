import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('account')
export class Account {
    @Column({ length: 128, comment: "Account Email", nullable: false, primary: true })
    email: string

    @Column({ length: 24, comment: 'Account Name', nullable: false })
    name: string

    @Column({ length: 48, comment: 'Account Password', nullable: false })
    password: string

    @Column({ length: 128, comment: 'Refresh Token', nullable: true, unique: true })
    refresh_token: string

    @CreateDateColumn({ comment: 'Account Create At', nullable: false })
    created_at: Date

    @UpdateDateColumn({ comment: 'Account Update At', nullable: true })
    update_at: Date
}
