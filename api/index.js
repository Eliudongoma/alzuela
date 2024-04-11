import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import auth from "./routes/auth.js";
import users from "./routes/users.js";

dotenv.config();
const connectUri = process.env.MONGO;
if (!connectUri) {
  console.log("MongoDB connection URI is not provided.");
  process.exit(1);
}
mongoose
  .connect(connectUri)
  .then(() => console.log("Mongodb is connected"))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use("/api/user", users);
app.use("/api/auth", auth);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log("Server is running on port 3000")
);

export default server;
