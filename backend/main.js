import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import AuthRouter from "./routes/AuthRoutes.js";
import todoRouter from "./routes/TodoRoutes.js";
import userModel from "./models/user.model.js";

config();

const app = express();

const deploy = process.env.DEPLOY.toString().toLowerCase();
const databaseURL = process.env.DB_URL.toString();
const serverPort = process.env.PORT.toString() || 80;

console.log(`\nServer started in ${deploy.toString()} mode.\n`);
const connectDatabase = async () => {
  console.log("Connecting to database..");
  try {
    await mongoose.connect(databaseURL);
    console.log("Connected to database.\n");
    console.log("Starting web server.");
    app.listen(serverPort);
    console.log(
      "Web server successfully started at port : " + serverPort + "\n"
    );
  } catch (e) {
    console.log("Connection to database failed : " + err.message);
  }
};

connectDatabase();

//middlewares
app.use(express.json());
app.use(cors());

app.use("/auth", AuthRouter);
app.use("/todo", todoRouter);

//connect to database and then start the server.

//perform a ligtweight operation every 10 seconds in order to prevent server from sleeping
// on free plan of render.
const smallOperation = async () => {
  await userModel.findOne({ email: "test@example.com" });
  //let's self ping too..
  const request = await fetch("https://todo-app-server-86yy.onrender.com/");
  console.log("self ping reports: " + request.status);
  return request;
};
if (deploy == "production") {
  setInterval(() => {
    smallOperation();
  }, 10000);
}
