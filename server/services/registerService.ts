
import {User} from '../models/User';
import {Roles} from '../constants/Roles'

async function register(req, res, next){  
   const { email, username, firstname, lastname, password} = req.body;
   const matchedUser = await User.findOne({where:{email}})
   if(matchedUser){
     return res.send("duplicate email");
   }
   else{
    const userDto = new User();
    userDto.email = email;
    userDto.username = username;
    userDto.firstName = firstname;
    userDto.lastName = lastname;
    userDto.password = password;
    userDto.role = Roles.USER;
    const user = await User.create({...userDto}).save();
    console.log("USER", userDto, user)
    return res.send(user);
   }


}

export default register;