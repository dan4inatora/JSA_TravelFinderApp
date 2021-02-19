import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn} from "typeorm";
import { Comment } from "./Comment";
import { Hotel } from "./Hotel";
import { User } from "./User";


@Entity('comment_reacts')
export class CommentReacts extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'thumb_react', nullable:true})
    thumbReact: number;

    @Column({name: 'party_react', nullable:true})
    partyReact: number;

    @Column({name: "user_id"})
    userId: number;

    @ManyToOne(() => User, user => user.commentReacts)
    @JoinColumn({name: "user_id"})
    user: User;

    @Column({name: "comment_id"})
    commentId: number;

    @ManyToOne(() => Comment, comment => comment.commentReacts)
    @JoinColumn({name: "comment_id"})
    comment: Comment;
    
}
