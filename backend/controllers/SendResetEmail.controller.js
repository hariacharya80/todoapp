import sendVerificationLink from "../helpers/SendVerificationLink";
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";

export default async function sendResetEmail(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(401).json({ msg: "Email address is required." });
    }
    if (
      !String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      return res.status(401).json({ msg: "Email address is not valid." });
    }
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        msg: "No user was found with that email address.",
      });
    }
    const token = await jwt.sign(
      { email: user.email },
      process.env.JWT_TOKEN.toString()
    );
    await sendVerificationLink(email, token, "password");
    return res
      .status(200)
      .json({ msg: "Password reset email sent successfully." });
  } catch (e) {
    return res.status(500).json({ msg: "An unknown server error occoured." });
  }
}
