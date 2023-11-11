import userModel from "../models/user.model";

export default async function (req, res) {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(401).json({ msg: "Logged in token is missing." });
    }
    const user = await userModel.findOne({ token: token });
    if (!user) {
      return res.status(401).json({ msg: "User was never logged in." });
    }
    const updatedUser = await userModel.findOneAndUpdate(
      { token: token },
      {
        token: "",
      }
    );
    await updatedUser.save();
    return res.status(200).json({ msg: "User logged out successfully." });
  } catch (e) {}
}
