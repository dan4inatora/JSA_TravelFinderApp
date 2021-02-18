import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import { Comment } from "./Comment";
import { CommentReacts } from "./CommentReacts";


@Entity('hotels')
export class Hotel extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'name'})
    name: string;

    @Column({name: 'times_reserved'})
    timesReserved: number;

    @OneToMany(() => Comment, comments => comments.hotel)
    comments: Comment[];


    
}
