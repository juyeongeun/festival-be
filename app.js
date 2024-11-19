import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middleware/error/errorHandler.js";
import participationRouter from "./router/participationRouter.js";

const app = express();
app.use(express.json());
dotenv.config();

// Express app에 CORS 적용
app.use(cors());

app.use("/", participationRouter);
app.use(errorHandler);

app.listen(3001, () => console.log("http://localhost:3001"));
