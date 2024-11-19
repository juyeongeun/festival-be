import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middleware/error/errorHandler.js";
import festivalRouter from "./router/festivalRouter.js";
import participationRouter from "./router/participationRouter.js";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.use("/festival", festivalRouter);
app.use("/", participationRouter);
app.use(errorHandler);

app.listen(3001, () => console.log("http://localhost:3001"));
