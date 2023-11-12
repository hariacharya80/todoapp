import jwt, { decode } from "jsonwebtoken";
import { config } from "dotenv";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
config();
export default async function ResetPassword(req, res) {
  try {
    const { token, password } = req.body;
    if (!token) return res.status(401).json({ msg: "Token is missing." });
    try {
      const decoded = await jwt.verify(token, process.env.JWT_TOKEN.toString());
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userModel.findOne({ email: decoded.email });
      if (!user) throw new Error("no user with that token email.");
      if (user.mailedToken !== token) {
        throw new Error("Not the valid token.");
      }
      const updateUser = await userModel.findOneAndUpdate(
        { email: decoded.email },
        {
          password: hashedPassword,
          mailedToken: "",
        }
      );
      if (!updateUser) throw new Error("No user exists.");
      return res.status(200).json({ msg: "Password changed successfully." });
    } catch (err) {
      console.log(err);
      return res.status(401).json({
        msg: "Token expired or is invalid, please request a new reset link.",
      });
    }
  } catch (e) {
    return res
      .status(500)
      .json({ msg: "An unknown internal server error occoured." });
  }
}
