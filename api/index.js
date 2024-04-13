import winston from "winston";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

require("./startup/logging.js")();
require("./startup/db.js")();
require("./startup/routes.js")(app);
require("./startup/prod.js")(app);

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  winston.info(`Server is listening on port ${port}`)
);

export default server;
