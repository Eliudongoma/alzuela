import winston from "winston";
import express from "express";
import dotenv from "dotenv";
import db from "./startup/db.js"
import routes from "./startup/routes.js"
import log from "./startup/logging.js"
import production from "./startup/prod.js"

dotenv.config();

const app = express();

log();
db();
routes(app);
production(app)

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  winston.info(`Server is listening on port ${port}`)
);

export default server;
