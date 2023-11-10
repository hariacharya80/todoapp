import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  token: {
    type: String,
  },
  mailedToken: {
    type: String,
  },
  level: {
    type: Number,
  },
});

const userModel = mongoose.model("User_Account", userSchema, "User_Account");
export default userModel;
