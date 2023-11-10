import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import AuthRouter from "./routes/AuthRoutes.js";

config();
const app = express();

const databaseURL = process.env.DB_URL.toString();
const serverPort = process.env.PORT.toString() || 80;

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
    console.log("Connection to database failed" + err.message);
  }
};
connectDatabase();

//middlewares
app.use(express.json());
app.use(cors());

app.use("/auth", AuthRouter);

//connect to database and then start the server.
