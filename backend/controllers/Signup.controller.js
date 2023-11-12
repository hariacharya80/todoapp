import validateSignupDetails from "../helpers/ValidateSignupDetails.js";
import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
import sendVerificationLink from "../helpers/SendVerificationLink.js";

export default async function SignupController(req, res) {
  try {
    const { email, password, name } = req.body;
    const validationResult = validateSignupDetails(email, password, name);
    if (validationResult.err) {
      return res.status(401).json({ msg: validationResult.msg });
    }

    const isUserAlready = await userModel.findOne({ email: email });
    if (isUserAlready) {
      return res.status(401).json({
        msg: "That email is already in use, please use another email address.",
      });
    }
    //hash the plain password.
    const hashedPassword = await bcrypt.hash(password, 10);
    
    //create a token to verify the user email.
    const token = jwt.sign({
      email
    }, process.env.JWT_TOKEN.toString());

    //create a new user.
    const newUser = await userModel.create({
      email: email,
      name: name,
      password: hashedPassword,
      mailedToken: token,
      verified: false,
    });

    //send the verification email
    await sendVerificationLink(email, token, "email");

    //save new user
    await newUser.save();


    //return a success response
    return res.status(200).json({ msg: "User created successfully." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "An unknown server error occurred." });
  }
}
