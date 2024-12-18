const express = require("express");
const { signupSchema, signinSchema, updateSchema } = require("../types");
const jwt = require("jsonwebtoken");
const { User, Accounts } = require("../db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const userRouter = express.Router();

// signup route
userRouter.post("/signup", async (req, res) => {
  let user = {
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };
  const { success } = signupSchema.safeParse(user);
  if (!success) {
    return res.json({
      msg: "invalid user details",
    });
  }
  let existingUser = await User.findOne({ username: req.body.username });
  if (existingUser) {
    return res.status(411).json({
      msg: "user already exists",
    });
  }

  try {
    let createdUser = await User.create(user);
    await Accounts.create({
      userId: createdUser._id,
      balance: 1 + Math.random() * 10000,
    });
    let token = jwt.sign(
      {
        userId: createdUser._id,
      },
      JWT_SECRET
    );
    return res.json({
      msg: "User created successfully",
      token,
    });
  } catch (error) {
    return res.json({ msg: "couldn't create user (database error)" });
  }
});

// signin route
userRouter.post("/signin", async (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };

  let { success } = signinSchema.safeParse(user);

  if (!success) {
    return res
      .status(403)
      .json({ msg: "couldn't sign in, insufficient details" });
  }

  let existingUser = await User.findOne(user);
  if (!existingUser) {
    return res.status(411).json({
      msg: "Error while logging in",
    });
  }
  let token = jwt.sign(
    {
      userId: existingUser._id,
    },
    JWT_SECRET
  );
  return res.status(200).json({
    token,
  });
});

// update details
userRouter.put("/", authMiddleware, async (req, res) => {
  let { success } = updateSchema.safeParse(req.body);
  if (!success) {
    return res.json({
      msg: "couldn't update user",
    });
  }
  try {
    let updatedUser = await User.updateOne({ _id: req.userId }, req.body);
    return res.status(200).json({
      msg: "updated successfully",
    });
  } catch (error) {
    return res.json({
      msg: "couldn't update user",
    });
  }
});

// get list of users
userRouter.get("/bulk", async (req, res) => {
  let filter = req.query.filter || "";
  let users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
          $options: "i",
        },
      },
      {
        lastName: {
          $regex: filter,
          $options: "i",
        },
      },
    ],
  });
  return res.json({
    user: users.map((user) => {
      return {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      };
    }),
  });
});
module.exports = userRouter;
