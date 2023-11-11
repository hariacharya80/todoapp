import sendVerificationLink from "../helpers/SendVerificationLink.js";
import userModel from "../models/user.model.js";

export default async function (req, res) {
  try {
    const { email } = req.body;
    if (!email) return res.status(401).json({ msg: "Something went wrong!" });
    const user = await userModel.findOne({ email: email });
    if (!user)
      return res
        .status(401)
        .json({ msg: "No account was found with that email." });
    const emailSent = await sendVerificationLink(user.email);
    if (!emailSent) {
      return res
        .status(401)
        .json({ msg: "There was an error sending the email." });
    }
    return res
      .status(200)
      .json({ msg: "Verification Email sent successfully." });
  } catch (e) {
    Console.error(e);
    return res.status(500).json({ msg: "An unknown server error occoured." });
  }
}
