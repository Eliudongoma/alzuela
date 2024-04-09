import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'

dotenv.config();
const connectUri = process.env.MONGO;
if(!connectUri){
  console.log("MongoDB connection URI is not provided.");
  process.exit(1)
}
mongoose
  .connect(connectUri)
  .then(() => console.log("Mongodb is connected"))
  .catch((err) => console.log(err))

const port = process.env.PORT || 3000;
const app = express();

app.listen(port, () => console.log('Server is running on port 3000')); 

app.use('/api/user',userRoutes);