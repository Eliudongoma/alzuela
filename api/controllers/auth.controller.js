import User from "../models/user.js"
import bcryptjs from 'bcryptjs'

export const signup = async (req, res, next) => {
  const { name, username, email, password } = req.body;

  const  hashedPassword = bcryptjs.hashSync(password, 10)

  const newUser = new User({
    name,
    username,
    email,
    password: hashedPassword
  });

  try{
    await newUser.save();
    res.json('SignUp Successful');
  } catch (err){
   next(err)
  }
  
}