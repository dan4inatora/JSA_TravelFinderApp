import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, PrimaryColumn} from "typeorm";
import { Comment } from "./Comment";
import { CommentReacts } from "./CommentReacts";
import { Favorites } from "./Favorites";
import { Images } from "./Images";
import { Ratings } from "./Ratings";


@Entity('hotels')
export class Hotel extends BaseEntity{
    @PrimaryColumn()
    id: string;

    @Column({name: "hotels_hotel_id"})
    hotelId: string;

    @OneToMany(() => Comment, comments => comments.hotel)
    comments: Comment[];

    @OneToMany(() => Favorites, favorites => favorites.hotel)
    favorites: Favorites[];

    @OneToMany(() => Ratings, rating => rating.hotel)
    ratings: Ratings[];

    @OneToMany(() => Images, image => image.hotel)
    images: Images[];

    
}
