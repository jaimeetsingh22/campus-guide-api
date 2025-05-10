// creating an express server
import express from "express";
const app = express();
// importing dotenv
import dotenv from "dotenv";
import router from "./routes/campusGuideRoutes.js";
import { client } from "./config/NilePostgresConfig.js";
import cors from "cors";
dotenv.config();
const port = process.env.PORT || 3000;
// allowing cors for all site
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
  })
);
//middleware to parse json data
app.use(express.json());

client
  .connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
app.use("/api", router);

app
  .listen(port, () => {
    console.log(`http://localhost:${port}`);
  })
  .on("error", (err) => {
    console.error("Error starting the server:", err);
    client.end();
  });
