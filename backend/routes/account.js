const express = require("express");
const { authMiddleware } = require("../middleware");
const { Accounts } = require("../db");
const { default: mongoose } = require("mongoose");

const accountsRouter = express.Router();

// fetch user balance
accountsRouter.get("/balance", authMiddleware, async (req, res) => {
  if (!req.userId) {
    res.status(403).json({
      msg: "Unauthenticated",
    });
  }
  try {
    let account = await Accounts.findOne({ userId: req.userId });
    return res.status(200).json({
      balance: account.balance,
    });
  } catch (error) {
    return res.status.json({
      msg: "invalid user",
    });
  }
});

// send money
accountsRouter.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { amount, to } = req.body;
  let from = await Accounts.findOne({ userId: req.userId }).session(session);

  if (!from || from.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      msg: "insuffiecient balance",
    });
  }

  let toAccount = await Accounts.find({ userId: to }).session(session);
  if (!toAccount || toAccount === from) {
    await session.abortTransaction();
    return res.status(400).json({
      msg: "Reciever does not exist",
    });
  }

  await Accounts.updateOne(
    { userId: req.userId },
    {
      $inc: {
        balance: -amount,
      },
    }
  ).session(session);
  await Accounts.updateOne(
    { userId: to },
    {
      $inc: {
        balance: amount,
      },
    }
  ).session(session);
  await session.commitTransaction();
  return res.json({
    msg: "transaction successful",
  });
});
module.exports = accountsRouter;
