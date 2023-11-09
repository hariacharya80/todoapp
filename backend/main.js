import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
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
//connect to database and then start the server.
