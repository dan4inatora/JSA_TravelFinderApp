import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BaseEntity, OneToMany} from "typeorm";
import bcrypt from 'bcrypt';
import { Field, Int, ObjectType } from "type-graphql";
import {Roles} from '../constants/Roles';

@ObjectType()
@Entity('users')
export class User extends BaseEntity{
    @Field( () => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column("text", { unique: true })
    email: string;
    
    @Field()
    @Column({name: 'username', unique: true })
    username: string;

    @Field({nullable: true})
    @Column({name: 'first_name' })
    firstName: string;

    @Field({nullable: true})
    @Column({name: 'last_name' })
    lastName: string;

    @Column({nullable:true})
    password: string;

    @Field({defaultValue: Roles.USER})
    @Column({default: Roles.USER})
    role: string;

    @BeforeInsert()
    async hashPassword() {
      if(this.password){
        this.password = await bcrypt.hash(this.password, 10);
      }
    }

    async comparePassword(attempt: string): Promise<boolean> {
      return await bcrypt.compare(attempt, this.password);
    }
}
