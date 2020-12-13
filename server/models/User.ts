import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BaseEntity} from "typeorm";
import bcrypt from 'bcrypt';
import {Roles} from '../constants/Roles';

@Entity('users')
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text", { unique: true })
    email: string;
    
    @Column({name: 'username', unique: true })
    username: string;

    @Column({name: 'first_name' })
    firstName: string;

    @Column({name: 'last_name' })
    lastName: string;

    @Column({nullable:true, select : false})
    password: string;

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
