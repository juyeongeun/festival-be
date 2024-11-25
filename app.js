import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middleware/error/errorHandler.js";
import festivalRouter from "./router/festivalRouter.js";
import participationRouter from "./router/participationRouter.js";
import userRouter from "./router/userRouter.js";
import boardRouter from "./router/boardRouter.js";
import boothRouter from "./router/boothRouter.js";
import noticeRouter from "./router/noticeRouter.js";
import commentRouter from "./router/commentRouter.js";
import wishlistRouter from "./router/wishlistRouter.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/festival", festivalRouter);
app.use("/participation", participationRouter);
app.use("/user", userRouter);
app.use("/board", boardRouter);
app.use("/booth", boothRouter);
app.use("/notice", noticeRouter);
app.use("/comment", commentRouter);
app.use("/wishlist", wishlistRouter);

app.use(errorHandler);

app.listen(3001, () => console.log("http://localhost:3001"));
