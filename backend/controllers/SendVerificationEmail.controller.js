import sendVerificationLink from "../helpers/SendVerificationLink.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

export default async function (req, res) {
  try {
    const { email } = req.body;

    if (!email) return res.status(401).json({ msg: "Something went wrong!" });

    const user = await userModel.findOne({ email: email });
    if (!user)
      return res
        .status(401)
        .json({ msg: "No account was found with that email." });

    const token = jwt.sign({ email: email }, process.env.JWT_TOKEN.toString());

    await sendVerificationLink(email, token, "email");
    return res
      .status(200)
      .json({ msg: "Verification Email sent successfully." });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "An unknown server error occoured." });
  }
}
