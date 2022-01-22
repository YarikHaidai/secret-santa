import {
    Column,
    CreateDateColumn,
    Entity,
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
    recipient_id: number;

    @OneToMany(
        type => Desire,
            desire => desire.user,
        {cascade: ['insert', 'update']}
    )
    desires: Desire[];

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;
}