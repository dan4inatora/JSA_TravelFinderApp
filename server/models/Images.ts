import {Entity, Column, BaseEntity, PrimaryColumn, ManyToOne, JoinColumn} from "typeorm";
import { Hotel } from "./Hotel";


@Entity('images')
export class Images extends BaseEntity{
    @PrimaryColumn()
    id: number;

    @Column({name: "image_path"})
    imagePath: number;

    @Column({name: "hotel_id"})
    hotelId: string;

    @ManyToOne(() => Hotel, hotel => hotel.images)
    @JoinColumn({name: "hotel_id"})
    hotel: Hotel;
    
}
