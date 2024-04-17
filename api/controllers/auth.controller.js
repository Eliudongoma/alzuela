import User from "../models/user.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

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
export const signin =async (req, res, next) => {
  
    const { username, password } = req.body;
    console.log(username)
    const validUser = await User.findOne({username});
    if (!validUser)
      return res.status(404).send("Wrong credentials");
     
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword)
     return res.status(404).send("Wrong credentials");
    try{
    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
     res
     .status(200)
     .cookie('access_token', token, { httpOnly: true})
     .json(rest);
    } catch (err){
      next(err)
    }
 
}