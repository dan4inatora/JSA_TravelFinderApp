import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { CommentReacts } from "./CommentReacts";
import { Hotel } from "./Hotel";
import { User } from "./User";


@Entity('comments')
export class Comment extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'comment'})
    comment: string;

    @Column({name: "user_id"})
    userId: number;

    @ManyToOne(() => User, user => user.comments)
    @JoinColumn({name: "user_id"})
    user: User;

    @Column({name: "hotel_id"})
    hotelId: string;

    @ManyToOne(() => Hotel, hotel => hotel.comments)
    @JoinColumn({name: "hotel_id"})
    hotel: Hotel;

    @OneToMany(() => CommentReacts, contentReacts => contentReacts.comment)
    commentReacts: CommentReacts[];
    
}
