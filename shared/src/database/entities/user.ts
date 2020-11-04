import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'user' })
export class User {
    @PrimaryColumn('uuid')
    id: string
    @Column('boolean')
    deleted: boolean
    @CreateDateColumn()
    created: Date
    @UpdateDateColumn()
    lastModified: Date
}