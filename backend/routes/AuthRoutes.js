import express from "express";
import SignupController from "../controllers/Signup.controller.js";
import LoginController from "../controllers/Login.controller.js";

const AuthRouter = express.Router();

AuthRouter.post("/login", LoginController);
AuthRouter.post("/signup", SignupController);

export default AuthRouter;
