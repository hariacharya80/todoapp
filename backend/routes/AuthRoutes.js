import express from "express";
import SignupController from "../controllers/Signup.controller.js";
import LoginController from "../controllers/Login.controller.js";
import LogoutController from "../controllers/Logout.controller.js";
import SendVerificationEmailController from "../controllers/SendVerificationEmail.controller.js";
import sendResetEmail from "../controllers/SendResetEmail.controller.js";
import VerifyEmailController from "../controllers/VerifyEmail.controller.js";

const AuthRouter = express.Router();

AuthRouter.post("/login", LoginController);
AuthRouter.post("/signup", SignupController);
AuthRouter.post("/verify", SendVerificationEmailController);
AuthRouter.put('/verify', VerifyEmailController)
AuthRouter.post("/reset", sendResetEmail);
AuthRouter.post("/logout", LogoutController);

export default AuthRouter;
