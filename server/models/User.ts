import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BaseEntity, OneToMany} from "typeorm";
import bcrypt from 'bcrypt';
import {Roles} from '../constants/Roles';
import { Comment } from "./Comment";
import { CommentReacts } from "./CommentReacts";
import { Favorites } from "./Favorites";

@Entity('users')
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'email'})
    email: string;
    
    @Column({name: 'user_name'})
    username: string;

    @Column({name: 'first_name' })
    firstName: string;

    @Column({name: 'last_name' })
    lastName: string;

    @Column({nullable:true})
    password: string;

    @Column({default: Roles.USER})
    role: string;

    @OneToMany(() => Comment, comments => comments.user)
    comments: Comment[];

    @OneToMany(() => CommentReacts, contentReacts => contentReacts.user)
    commentReacts: CommentReacts[];

    @OneToMany(() => Favorites, favorites => favorites.user)
    favorites: Favorites[];
    

    @BeforeInsert()
    async hashPassword() {
      if(this.password){
        this.password = await bcrypt.hash(this.password, 10);
      }
    }

    async comparePassword(attempt: string): Promise<boolean> {
      console.log("HIUSTON HERE", attempt, this.password);
      return await bcrypt.compare(attempt, this.password);
    }

    constructor(email:string, username: string, firstName: string, lastName: string, password:string, role: string){
      super();
      this.email = email;
      this.username = username;
      this.firstName = firstName;
      this.lastName = lastName;
      this.password = password;
      this.role = role;
    }
}
