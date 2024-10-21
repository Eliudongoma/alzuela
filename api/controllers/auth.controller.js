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
  const { username, password } = req.body;
  try{
    const validUser = await User.findOne({username});
    if (!validUser || !bcryptjs.compareSync(password, validUser.password))
      return next(errorHandler(400, "Invalid credentials"));
     
    createToken(validUser, res);
    } catch (error){
      next(error);
    } 
}

function createToken (user, res){
  const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
  console.log(token)
  const { password: pass, ...rest } = user._doc;
  res
    .status(200)
    .cookie('access_token', token, { httpOnly: true})
    .json(rest);
}

export const google = async (req, res, next) => {
  const { email, displayName, photoURL } = req.body;

  try{
    const user = await User.findOne({ email });
    if(user) createToken(user, res)
    else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        name: displayName,
        username: displayName.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: photoURL
      });
      await newUser.save();
      createToken(newUser, res);
    }
  }catch (error){
    next(error);
  }
}