import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn, ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {DesireEntity as Desire} from "../desire/desire.entity";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column({nullable: true})
    public recipient_id?: number;

    @ManyToOne(() => UserEntity, user => user.id)
    @JoinColumn({name: 'recipient_id'})
    public recipient?: UserEntity;

    @OneToMany(
        type => Desire,
        desire => desire.user,
        {cascade: true}
    )
    desires: Desire[];

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;
}