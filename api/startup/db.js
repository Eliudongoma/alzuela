import mongoose from "mongoose";
import winston from "winston";

export default function () {
  mongoose
    .connect(process.env.MONGO)
    .then(() => winston.info(`Connection to database is successful!`))
    .catch((error) => winston.error(`Error connecting to the DB ${error}`));
}
