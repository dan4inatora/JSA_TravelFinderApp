import {Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import { Hotel } from "./Hotel";


@Entity('images')
export class Images extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: "image_path"})
    imagePath: string;

    @Column({name: "hotel_id"})
    hotelId: number;

    @ManyToOne(() => Hotel, hotel => hotel.images)
    @JoinColumn({name: "hotel_id"})
    hotel: Hotel;
    
}
