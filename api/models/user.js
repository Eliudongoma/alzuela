import mongoose from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";

const schema = new mongoose.Schema({
  avatar: String,
  username: {
    type: String,
    maxlength: 50,
    minlength: 4,
    required: true,
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
    trim: true,
  },
  timestamp: {
    type: Number,
    default: function () {
      return this._id.getTimestamp();
    },
  },
});

schema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      avatar: this.avatar,
      name: this.name,
      username: this.username,
    },
    process.env.jwtPrivateKey
  );
};

const User = mongoose.model("User", schema);

export const validateUser = (user) =>
  Joi.object({
    avatar: Joi.string(),
    email: Joi.string().min(1).max(255),
    name: Joi.string().min(3).max(50).required(),
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(6).max(1024).required(),
  }).validate(user);

export default User;

// import mongoose, {Document, Model, Schema} from 'mongoose'

// interface UserDocument extends Document{
//     username: string;
//     email: string;
//     password: string;
//     createdAt: Date;
//     updatedAt: Date;
// }

// interface UserModel extends Model<UserDocument> {}

// const userSchemaFields: Record<string, any> = {
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   email:{
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password:{
//     type: String,
//     required: true,
//   },
// }
// const userSchema = new Schema<UserDocument, UserModel>(userSchemaFields, {timestamps: true});

// const User: Model<UserDocument> = mongoose.model<UserDocument, UserModel>("User", userSchema);

// export default User
