import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { CommentReacts } from "./CommentReacts";
import { Hotel } from "./Hotel";
import { User } from "./User";


@Entity('favorites')
export class Favorites extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: "user_id"})
    userId: number;

    @ManyToOne(() => User, user => user.favorites)
    @JoinColumn({name: "user_id"})
    user: User;

    @Column({name: "hotel_id"})
    hotelId: string;

    @ManyToOne(() => Hotel, hotel => hotel.favorites)
    @JoinColumn({name: "hotel_id"})
    hotel: Hotel;
    
}
