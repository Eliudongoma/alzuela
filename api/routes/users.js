import express from "express";
import { test } from "../controllers/user.controller.js";

import bcrypt from "bcrypt";
import validator from "../middleware/validate";
import User, { validateUser } from "../models/user.js";

const router = express.Router();

router.post("/", validator(validateUser), async (req, res) => {
  const { password, name, username } = req.body;
  let user = await User.findOne({ username });

  if (user) return res.status(400).send({ error: "Username is already taken" });

  user = new User({ name, username, password });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  res
    .header("x-auth-token", user.generateAuthToken())
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, "-password"));
});

router.get("/test", test);

export default router;

// import express, {Router} from 'express'
// import { test } from '../controllers/user.controller';

// const router: Router = express.Router();

// router.get('/test', test);

// export default router;
