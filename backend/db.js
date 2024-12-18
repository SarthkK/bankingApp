const mongoose = require("mongoose");

(async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sarthk:admin@backend.i9mpn.mongodb.net/paytm"
    );
  } catch (error) {
    console.log("Error connecting to mongoDB instance");
  }
})();

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = new mongoose.model("User", userSchema);
const Accounts = new mongoose.model("Accounts", accountSchema);

module.exports = { User, Accounts };
