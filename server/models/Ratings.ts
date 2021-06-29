import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { Hotel } from "./Hotel";
import { User } from "./User";


@Entity('ratings')
export class Ratings extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: "rating"})
    rating: number;

    @Column({name: "user_id"})
    userId: number;

    @ManyToOne(() => User, user => user.ratings)
    @JoinColumn({name: "user_id"})
    user: User;

    @Column({name: "hotel_id"})
    hotelId: string;

    @ManyToOne(() => Hotel, hotel => hotel.ratings)
    @JoinColumn({name: "hotel_id"})
    hotel: Hotel;
    
}
