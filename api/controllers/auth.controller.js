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

  try{
    const validUser = await User.findOne({username});
    if (!validUser){ 
     return next(errorHandler(404, "Wrong credentials"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
     return next(errorHandler(404, "Wrong Credentials"));
    }
    // const loginDetails = new User({
    //   username: validUser.username,
    //   password: validUser.password
    // })
    // await loginDetails.sign();
    // res.json("SignIn Successful")
     const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
     //const { password: pass, ...rest } = validUser._doc;
     res
      .status(200)
      .cookie('access_token', token, { httpOnly: true,})
      .json("SignIn Successful");

  }catch (err) {
    next(err);
  }
}