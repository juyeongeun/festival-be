import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middleware/error/errorHandler.js";
import festivalRouter from "./router/festivalRouter.js";
import participationRouter from "./router/participationRouter.js";
import userRouter from "./router/userRouter.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/festival", festivalRouter);
app.use("/", participationRouter);

app.use("/user", userRouter);

app.use(errorHandler);

app.listen(3001, () => console.log("http://localhost:3001"));
