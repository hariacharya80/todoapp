import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ValidateEmailPassword from "../helpers/ValidateEmailPassword.js";

export default async function LoginController(req, res) {
  try {
    const { username, password } = req.body;
    //minimum case that this statements will be called since, the frontend is already
    //santizing the email address and password but request can be from other than frontend so.
    const validationResult = ValidateEmailPassword(username, password);
    if (validationResult.err) {
      return res.status(401).json({ msg: validationResult.msg });
    }

    //check if the user exists in the database.
    const existingUser = await UserModel.findOne({ username: username });

    //no user found in the database.
    if (!existingUser) {
      return res.status(401).json({
        msg: "No user with that email, please check your email address.",
      });
    }

    //check if the password is correct.
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    //password is not valid
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Wrong password, please try again." });
    }

    //if password is valid
    const token = jwt.sign({
      name: existingUser.name,
      email: existingUser.email,
    });

    //send the token and success message
    return res.status(200).json({
      loggedIn: true,
      authToken: token,
    });
  } catch (err) {
    //return a error message.
    console.log(err);
    return res
      .status(500)
      .json({ msg: "Unknown internal error: " + err.message });
  }
}
