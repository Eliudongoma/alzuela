import cors from "cors";
import express from "express";
import path from "path";

import auth from "../routes/auth";
import users from "../routes/users";
import user from "../routes/test";

const __dirname = path.resolve();

export default (app) => {
  app.use(express.static(path.join(__dirname, "client/dist")));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
  app.use(express.json());
  app.use(cors({ origin: "*" }));

  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/test", user);

  app.use((err, req, res) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server error";
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });
};
