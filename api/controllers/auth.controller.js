import User from "../models/user.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { errorHandler } from "../utils/error.js";

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
  
  try{
    const { username, password } = req.body;

    const validUser = await User.findOne({username});
    if (!validUser || !bcryptjs.compareSync(password, validUser.password))
      return next(errorHandler(404, "Invalid credentials"));  
     
    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
     res
     .status(200)
     .cookie('access_token', token, { httpOnly: true})
     .json(rest);
    } catch (error){
      res.status(500).json({ message: "Internal Server Error" });
    }
 
}