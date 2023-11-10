import validateSignupDetails from "../helpers/ValidateSignupDetails.js";
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";

export default async function SignupController(req, res) {
  try {
    const { email, name, password } = req.body;
    const validationResult = validateSignupDetails(email, password, name);
    if (validationResult.err) {
      return res.status(401).json({ msg: validationResult.msg });
    }

    //hash the plain password.
    const hashedPassword = bcrypt.hash(password, 10);

    //create a new user.
    const newUser = await userModel.create({
      email: email,
      name: name,
      password: hashedPassword,
    });

    //save new user
    await newUser.save();

    //return a success response
    return res.status(200).json({ msg: "User created successfully." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "An unknown server error occurred." });
  }
}
