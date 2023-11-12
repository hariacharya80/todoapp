import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
  token: {
    type: String,
    default: "",
  },
  mailedToken: {
    type: String,
    default: "",
  },
  level: {
    type: Number,
    default: 0,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

const userModel = mongoose.model("User_Account", userSchema, "User_Account");
export default userModel;
