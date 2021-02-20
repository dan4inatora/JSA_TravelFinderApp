import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, PrimaryColumn} from "typeorm";
import { Comment } from "./Comment";
import { CommentReacts } from "./CommentReacts";
import { Favorites } from "./Favorites";
import { Ratings } from "./Ratings";


@Entity('hotels')
export class Hotel extends BaseEntity{
    @PrimaryColumn()
    id: number;

    @Column({name: 'name'})
    name: string;

    @Column({name: 'times_reserved'})
    timesReserved: number;

    @OneToMany(() => Comment, comments => comments.hotel)
    comments: Comment[];

    @OneToMany(() => Favorites, favorites => favorites.hotel)
    favorites: Favorites[];

    @OneToMany(() => Ratings, rating => rating.hotel)
    ratings: Ratings[];

    
}
