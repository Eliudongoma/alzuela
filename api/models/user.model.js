import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true,
  },
}, {timestamps: true}
);

const User = mongoose.model("User", userSchema);

export default User









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